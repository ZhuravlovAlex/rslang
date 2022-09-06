import { ISprintGame, Statistic } from '../../models/models';
import { Users, Words } from '../../api/api';
import { Word } from '../../models/models';
import { getRandomBoolean, getRandomInt, getUserId, getUserToken, shuffle } from '../../utils/utils';
import * as moment from 'moment';

export class SprintGame implements ISprintGame {
    time: number;
    points: number;
    words: Word[];
    isFinished: boolean;
    index: number;
    multiplier: number;
    winStreak: number;
    isCorrect: boolean;
    wordP: HTMLDivElement | null;
    translationP: HTMLParagraphElement | null;
    timerH: HTMLHeadingElement | null;
    interval: NodeJS.Timer | null;
    bonusImage: HTMLImageElement | null;
    bestWinstreak = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    startNewGame: () => void;

    constructor(startNewGame: () => void) {
        this.time = 20;
        this.points = 0;
        this.words = [];
        this.isFinished = false;
        (this.index = 0), (this.multiplier = 1);
        this.winStreak = 0;
        this.isCorrect = true;
        this.interval = null;
        this.wordP = null;
        this.translationP = null;
        this.timerH = null;
        this.bonusImage = null;
        this.startNewGame = startNewGame;
    }

    init(difficulty: string) {
        this.wordP = document.querySelector('.sprint-word') as HTMLParagraphElement;
        this.translationP = document.querySelector('.translation') as HTMLParagraphElement;
        this.timerH = document.querySelector('.timer') as HTMLHeadingElement;
        this.bonusImage = document.querySelector('.sprint-image') as HTMLImageElement;
        const randomPage = String(getRandomInt(0, 19));
        this.getWords(difficulty, randomPage);
        this.startTimer();
    }

    startTimer() {
        this.timerH!.innerHTML = String(this.time);
        this.interval = setInterval(() => {
            this.time -= 1;
            this.timerH!.innerHTML = String(this.time);
            if (this.time < 1) {
                clearInterval(this.interval!);
                this.endGame();
            }
        }, 1000);
    }

    gainPoints(): number {
        return (this.points += 20 * this.multiplier);
    }

    answerQuestion(points: HTMLHeadingElement, answer: boolean) {
        if (answer === this.isCorrect) {
            this.winStreak += 1;
            this.checkMultiplier();
            points.textContent = `Очки:${this.gainPoints()}`;
            this.bestWinstreak = Math.max(this.bestWinstreak, this.winStreak);
            this.correctAnswers += 1;
        } else {
            this.winStreak = 0;
            this.multiplier = 1;
            this.incorrectAnswers += 1;
        }
        this.index += 1;
        if (this.index >= this.words.length) {
            this.endGame();
            return;
        }
        this.createQuestion();
    }

    checkMultiplier() {
        if (this.winStreak > 0 && this.winStreak % 4 === 0 && this.multiplier < 4) {
            this.multiplier += 1;
        }
        this.createStars();
        this.changeBonusImage();
    }

    changeBonusImage() {
        this.bonusImage!.src = `./assets/sprint-game/0${this.multiplier}.png`;
    }

    createStars() {
        const starsContainer = document.querySelector('.stars');
        starsContainer!.innerHTML = '';
        for (let i = 1; i <= this.winStreak % 4; i++) {
            const star = document.createElement('img');
            star.src = './assets/sprint-game/star.png';
            star.classList.add('star');
            starsContainer?.append(star);
        }
    }

    createQuestion() {
        this.wordP!.textContent = this.words[this.index].word;
        this.isCorrect = getRandomBoolean();
        if (this.isCorrect) {
            this.translationP!.textContent = this.words[this.index].wordTranslate;
        } else {
            const randomIndex = getRandomInt(0, this.words.length);
            this.translationP!.textContent = this.words[randomIndex].wordTranslate;
        }
    }

    async getWords(group: string, page: string) {
        Words.getWords(group, page).then((result) => {
            this.words = result;
            this.createQuestion();
        });
    }

    endGame() {
        clearInterval(this.interval!);
        const mainContainer = document.querySelector('.main');
        mainContainer!.innerHTML = `
        <h1>Игра окончена</h1>
        <h1>Вы набрали ${this.points} очков</h1>
        <button class="sprint-new-game">Начать новую игру</button>
        `;
        document.querySelector('.sprint-new-game')!.addEventListener('click', () => {
            this.startNewGame();
        });
        if (getUserToken()) this.updateStatistics();
    }

    updateStatistics() {
        Users.getUserStatistic(getUserId() || '').then((res) => {
            delete res['id'];

            const statistic = res || {
                learnedWords: 0,
                optional: {
                    sprint: {
                        learnedWords: [],
                        bestScore: [],
                        total: 0,
                        wrongWords: 0,
                    },
                    audio: {
                        learnedWords: [],
                        bestScore: [],
                        total: 0,
                        wrongWords: 0,
                    },
                },
            };

            //update best score
            const newBestScoreToday = this.points;
            const prevBestScoreTodayIndex = statistic.optional.sprint.bestScore.findIndex(
                (bs) => bs.date === moment().format('YYYY-MM-DD')
            );
            if (prevBestScoreTodayIndex > -1) {
                const prevBestScoreToday = statistic.optional.sprint.bestScore[prevBestScoreTodayIndex].count;
                statistic.optional.sprint.bestScore[prevBestScoreTodayIndex].count = Math.max(
                    prevBestScoreToday,
                    newBestScoreToday
                );
            } else {
                statistic.optional.sprint.bestScore.push({
                    count: newBestScoreToday,
                    date: moment().format('YYYY-MM-DD'),
                });
            }

            //update winstreak
            const newWinstreak = this.bestWinstreak;
            const oldWinstreak = statistic.optional.sprint.bestWinstreak || 0;
            statistic.optional.sprint.bestWinstreak = Math.max(oldWinstreak, newWinstreak);

            //update total
            statistic.optional.sprint.total += this.correctAnswers;

            //update wrong words
            statistic.optional.sprint.wrongWords += this.incorrectAnswers;

            //update learned words
            // const newLearnedWordsCount = this.learnedWords.length;
            // const prevLearnedWordsTodayIndex = statistic.optional.sprint.learnedWords.findIndex(lv => lv.date === moment().format('YYYY-MM-DD'));
            // if (prevLearnedWordsTodayIndex > -1) {
            //   statistic.optional.sprint.learnedWords[prevBestScoreTodayIndex].count += newLearnedWordsCount;
            // } else {
            //   statistic.optional.sprint.learnedWords.push({
            //     count: newLearnedWordsCount,
            //     date: moment().format('YYYY-MM-DD')
            //   })
            // }

            //push to db
            Users.updateUserStatistic(getUserId() || '', statistic);
        });
    }
}
