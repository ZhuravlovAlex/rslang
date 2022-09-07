import { Words, Users } from '../../api/api';
import { Word } from '../../models/models';
import { getRandomInt, shuffle, getUserId, getUserToken } from '../../utils/utils';
import * as moment from 'moment';

export class AudioGame {
    words: Word[];
    currentIndex: number;
    correctAnswer: number;
    points: number;
    playAudioButton: HTMLImageElement | null;
    startNewGame: () => void;
    difficulty: string;
    bestWinstreak = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    winStreak: number;

    constructor(startNewGame: () => void) {
        this.playAudioButton = null;
        this.startNewGame = startNewGame;
        this.words = [];
        this.currentIndex = 0;
        this.correctAnswer = 0;
        this.points = 0;
        this.difficulty = '';
        this.winStreak = 0;
    }

    async getWords(group: number, page: number) {
        this.words = await Words.getWords(`${group}`, `${page}`);
        shuffle(this.words);
    }

    init(difficulty: string) {
        this.startGame();
    }

    createQuestion() {
        this.playAudioButton!.classList.remove('wrong');
        this.playAudioButton!.classList.remove('correct');
        document.querySelectorAll('.audio-game-buttons > button')!.forEach((button) => {
            (button as HTMLButtonElement).disabled = false;
        });
        const answers: number[] = [];
        answers.push(this.currentIndex);
        for (let i = 0; i < 4; i++) {
            let randomAnswer: number;
            do {
                randomAnswer = getRandomInt(0, 20);
            } while (answers.includes(randomAnswer));
            answers.push(randomAnswer);
        }
        shuffle(answers);
        const answersButtons: HTMLButtonElement[] = Array.from(
            document.querySelectorAll('.audio-game-buttons > button')
        );
        answers.forEach((el, index) => {
            if (el === this.currentIndex) this.correctAnswer = Number(answersButtons[index].id);
            answersButtons[index].textContent = this.words[el].wordTranslate;
        });
        (document.querySelector('.audio-game-next')! as HTMLButtonElement).disabled = true;
        this.playAudioButton!.src = './assets/audio-game/play-icon.jpg';
        (document.querySelector('.audio-word') as HTMLHeadingElement).textContent = ``;
        (document.querySelector('.audio-transcription') as HTMLHeadingElement).textContent = ``;
        (document.querySelector('.audio-translation') as HTMLHeadingElement).textContent = ``;
    }

    playAudio() {
        const url = `https://rs-lang-team187.herokuapp.com/${this.words[this.currentIndex].audio}`;
        new Audio(url).play();
    }

    answerQuestion(id: number) {
        if (id === this.correctAnswer) {
            this.winStreak += 1;
            this.addPoints();
            this.playAudioButton!.classList.add('correct');
            this.bestWinstreak = Math.max(this.bestWinstreak, this.winStreak);
            this.correctAnswers += 1;
        } else {
            this.incorrectAnswers += 1;
            this.winStreak = 0;
            this.playAudioButton!.classList.add('wrong');
        }
        if (this.currentIndex >= 19) {
            this.endGame();
            return;
        }
        (document.querySelector('.audio-game-next')! as HTMLButtonElement).disabled = false;
        document.querySelectorAll('.audio-game-buttons > button')!.forEach((button) => {
            (button as HTMLButtonElement).disabled = true;
        });
        (document.querySelector(
            '.audio-game-image'
        ) as HTMLImageElement).src = `https://rs-lang-team187.herokuapp.com/${this.words[this.currentIndex].image}`;
        (document.querySelector('.audio-word') as HTMLHeadingElement).textContent = `${
            this.words[this.currentIndex].word
        }`;
        (document.querySelector('.audio-transcription') as HTMLHeadingElement).textContent = `${
            this.words[this.currentIndex].transcription
        }`;
        (document.querySelector('.audio-translation') as HTMLHeadingElement).textContent = `${
            this.words[this.currentIndex].wordTranslate
        }`;
    }

    addPoints() {
        this.points += 1;
        document.querySelector('.points')!.textContent = `Угадано слов: ${this.points}.`;
    }

    endGame(): void {
        document.querySelector('.main')!.innerHTML = `<h2>Игра окончена! Вы угадали ${this.points}/20 слов!</h2>
    <button class="audio-new-game">Начать новую игру</button>`;
        document.querySelector('.audio-new-game')!.addEventListener('click', () => {
            this.startNewGame();
        });
        if (getUserToken()) this.updateStatistics();
    }

    startGame() {
        const mainContainer = document.querySelector('.main') as HTMLElement;
        mainContainer.innerHTML = `
    <div class="audio-game">
    <h3 class="points">Угадано слов: 0</h3>
    <img class="audio-game-image" src="" alt="">
    <h2 class="audio-word"></h2>
    <h3 class="audio-transcription"></h3>
    <h3 class="audio-translation"></h3>
    <div class="audio-game-buttons">
    <button id="1"></button>
    <button id="2"></button>
    <button id="3"></button>
    <button id="4"></button>
    <button id="5"></button>
    </div>
    <button class="audio-game-next">Продолжить</button>
    </div>
  `;
        this.playAudioButton = document.querySelector('.audio-game-image') as HTMLImageElement;
        const randomPage = getRandomInt(0, 20);
        this.getWords(+this.difficulty, randomPage).then(() => {
            this.createQuestion();
        });
        this.playAudioButton.addEventListener('click', () => this.playAudio());
        const answersButtons: HTMLButtonElement[] = Array.from(
            document.querySelectorAll('.audio-game-buttons > button')
        );
        answersButtons.forEach((button) =>
            button.addEventListener('click', (e) => {
                const id = (e.target as HTMLButtonElement).id;
                this.answerQuestion(+id!);
            })
        );
        this.playAudioButton.src = './assets/audio-game/play-icon.jpg';
        (document.querySelector('.audio-game-next')! as HTMLButtonElement).disabled = true;
        document.querySelector('.audio-game-next')!.addEventListener('click', () => {
            this.currentIndex++;
            this.createQuestion();
        });
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
            const prevBestScoreTodayIndex = statistic.optional.audio.bestScore.findIndex(
                (bs) => bs.date === moment().format('YYYY-MM-DD')
            );
            if (prevBestScoreTodayIndex > -1) {
                const prevBestScoreToday = statistic.optional.audio.bestScore[prevBestScoreTodayIndex].count;
                statistic.optional.audio.bestScore[prevBestScoreTodayIndex].count = Math.max(
                    prevBestScoreToday,
                    newBestScoreToday
                );
            } else {
                statistic.optional.audio.bestScore.push({
                    count: newBestScoreToday,
                    date: moment().format('YYYY-MM-DD'),
                });
            }

            //update winstreak
            const newWinstreak = this.bestWinstreak;
            const oldWinstreak = statistic.optional.audio.bestWinstreak || 0;
            statistic.optional.audio.bestWinstreak = Math.max(oldWinstreak, newWinstreak);

            //update total
            statistic.optional.audio.total += this.correctAnswers;

            //update wrong words
            statistic.optional.audio.wrongWords += this.incorrectAnswers;

            //update learned words
            // const newLearnedWordsCount = this.learnedWords.length;
            // const prevLearnedWordsTodayIndex = statistic.optional.audio.learnedWords.findIndex(lv => lv.date === moment().format('YYYY-MM-DD'));
            // if (prevLearnedWordsTodayIndex > -1) {
            //   statistic.optional.audio.learnedWords[prevBestScoreTodayIndex].count += newLearnedWordsCount;
            // } else {
            //   statistic.optional.audio.learnedWords.push({
            //     count: newLearnedWordsCount,
            //     date: moment().format('YYYY-MM-DD')
            //   })
            // }

            //push to db
            statistic.optional.hardWords = statistic.optional.hardWords || 0;
            Users.updateUserStatistic(getUserId() || '', statistic);
        });
    }
}
