import { ISprintGame, Statistic } from '../../models/models';
import { Users, Words } from '../../api/api';
import { Word } from '../../models/models';
import { getRandomBoolean, getRandomInt, getUserId, shuffle } from '../../utils/utils';
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
    wordP: HTMLDivElement;
    translationP: HTMLParagraphElement;
    timerH: HTMLHeadingElement;
    interval: NodeJS.Timer | null;
    bonusImage: HTMLImageElement;
    bestWinstreak = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;

    constructor(
        wordP: HTMLParagraphElement,
        translationP: HTMLParagraphElement,
        timerH: HTMLHeadingElement,
        bonusImage: HTMLImageElement
    ) {
        this.time = 5;
        this.points = 0;
        this.words = [];
        this.isFinished = false;
        (this.index = 0), (this.multiplier = 1);
        this.winStreak = 0;
        this.wordP = wordP;
        this.translationP = translationP;
        this.timerH = timerH;
        this.bonusImage = bonusImage;
        this.isCorrect = true;
        this.interval = null;
    }

    startTimer() {
        this.timerH.innerHTML = String(this.time);
        this.interval = setInterval(() => {
            this.time -= 1;
            this.timerH.innerHTML = String(this.time);
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
        this.bonusImage.src = `../assets/sprint-game/0${this.multiplier}.png`;
    }

    createStars() {
        const starsContainer = document.querySelector('.stars');
        starsContainer!.innerHTML = '';
        for (let i = 1; i <= this.winStreak % 4; i++) {
            const star = document.createElement('img');
            star.src = '../../assets/sprint-game/star.png';
            star.classList.add('star');
            starsContainer?.append(star);
        }
    }

    createQuestion() {
        this.wordP.textContent = this.words[this.index].word;
        this.isCorrect = getRandomBoolean();
        if (this.isCorrect) {
            this.translationP.textContent = this.words[this.index].wordTranslate;
        } else {
            const randomIndex = getRandomInt(0, this.words.length);
            this.translationP.textContent = this.words[randomIndex].wordTranslate;
        }
    }

    getWords(group: number, page: number = 30) {
        let wordsArray: Promise<Word[]>[] = [];
        for (let i = page; i >= 0; i--) {
            let tempWords = Words.getWords(`${group}`, `${i}`);
            wordsArray = wordsArray.concat(tempWords);
        }
        // shuffle(wordsArray);
        return wordsArray;
    }

    startGame(allWords: boolean = false) {
        Promise.all(this.getWords(0)).then((result) => {
            result.map((arr) => shuffle(arr));
            this.words = result.flat();
            if (allWords) {
                shuffle(this.words);
            }
            this.createQuestion();
            this.startTimer();
        });
    }

    endGame() {
        clearInterval(this.interval!);
        alert('Game is ended!');

        this.updateStatistics();
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
