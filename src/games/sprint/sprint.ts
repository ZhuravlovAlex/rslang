import { ISprintGame, Statistic } from "../../models/models";
import { Users, Words } from "../../api/api";
import { Word } from '../../models/models'
import { getRandomBoolean, getRandomInt, getUserId, shuffle } from "../../utils/utils";

export class SprintGame implements ISprintGame {
  time: number;
  points: number;
  words: Word[];
  isFinished: boolean;
  index: number
  multiplier: number;
  winStreak: number;
  isCorrect: boolean;
  wordP: HTMLDivElement;
  translationP: HTMLParagraphElement;
  timerH: HTMLHeadingElement;
  interval: NodeJS.Timer | null;
  bonusImage: HTMLImageElement;

  constructor(wordP: HTMLParagraphElement, translationP: HTMLParagraphElement,
    timerH: HTMLHeadingElement, bonusImage: HTMLImageElement) {
    this.time = 20;
    this.points = 0;
    this.words = [];
    this.isFinished = false;
    this.index = 0,
      this.multiplier = 1;
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
    return this.points += 20 * this.multiplier;
  }

  answerQuestion(points: HTMLHeadingElement, answer: boolean) {
    if (answer === this.isCorrect) {
      this.winStreak += 1;
      this.checkMultiplier();
      points.textContent = `Очки:${this.gainPoints()}`;
    }
    else {
      this.winStreak = 0;
      this.multiplier = 1;
    }
    this.index += 1;
    if (this.index >= this.words.length) {
      this.endGame();
      return;
    }
    this.createQuestion();
  }

  checkMultiplier() {
    if (this.winStreak > 0 && (this.winStreak % 4) === 0 && (this.multiplier < 4)) {
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
    starsContainer!.innerHTML = "";
    for (let i = 1; i <= this.winStreak % 4; i++) {
      const star = document.createElement('img');
      star.src = "../../assets/sprint-game/star.png"
      star.classList.add('star');
      starsContainer?.append(star);
    }
  }

  createQuestion() {
    this.wordP.textContent = this.words[this.index].word;
    this.isCorrect = getRandomBoolean();
    if (this.isCorrect) {
      this.translationP.textContent = this.words[this.index].wordTranslate;
    }
    else {
      const randomIndex = getRandomInt(0, this.words.length);
      this.translationP.textContent = this.words[randomIndex].wordTranslate;
    }
  }


  getWords(group: number, page: number = 30,) {
    let wordsArray: Promise<Word[]>[] = [];
    for (let i = page; i >= 0; i--) {
      let tempWords = Words.getWords(`${group}`, `${i}`);
      wordsArray = wordsArray.concat(tempWords);
    }
    // shuffle(wordsArray);
    return wordsArray;
  }

  startGame(allWords: boolean = false) {
    Promise.all(this.getWords(0)).then(result => {
      result.map(arr => shuffle(arr));
      this.words = result.flat();
      if (allWords) { shuffle(this.words); }
      this.createQuestion();
      this.startTimer();
    });
  }

  endGame() {
    clearInterval(this.interval!);
  }

  async updateStatistics() {
    // const statistic: Statistic = await Users.getUserStatistic(getUserId()!);
    // if ('optional' in statistic)
    //   if ('sprint' in statistic.optional!)
    // const stats: Statistic = {
    //   optional: {
    //     test: 'test123'
    //   }
    // }
    // await Users.updateUserStatistic(getUserId()!,stats)
    // const statistic: Statistic = await Users.getUserStatistic(getUserId()!);
    // console.log(statistic);
  }
}