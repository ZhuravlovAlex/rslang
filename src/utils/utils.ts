import { Users } from '../api/api';
import { UserWord, Word } from '../models/models';
import { audioPlay } from '../wordsLevels/audioButton';

export function saveUserInLocalStorage(token: string, id: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
}

export function getUserToken(): string | null {
    return localStorage.getItem('token') || null;
}

export function getUserId(): string | null {
    return localStorage.getItem('id') || null;
}

export function deleteUserFromLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
}

export function shuffle(array: Word[] | number[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
export function getRandomBoolean(): boolean {
    return Math.random() < 0.6;
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function postUserWord(wordId: string, difficulty: string) {
    if (!localStorage.getItem('token')) {
        alert('Вам нужно зарегистрироваться');
        return;
    }
    const UserId = localStorage.getItem('id');
    const userWord: UserWord = {
        difficulty: difficulty,
    };

    Users.getUserStatistic(UserId!).then((res) => {
        delete res['id'];

        res.optional.hardWords = res.optional.hardWords || 0;
        res.optional.hardWords += 1;

        Users.updateUserStatistic(UserId!, res);
        Users.createUserWord(UserId!, wordId, userWord);
    });
}

function deleteUserWord(wordId: string) {
    if (!localStorage.getItem('token')) {
        alert('Вам нужно зарегистрироваться');
        return;
    }
    const UserId = localStorage.getItem('id');

    Users.getUserStatistic(UserId!).then((res) => {
        delete res['id'];

        res.optional.hardWords = res.optional.hardWords || 0;
        res.optional.hardWords = Math.max(0, res.optional.hardWords - 1);

        Users.updateUserStatistic(UserId!, res);
        Users.deleteUserWord(UserId!, wordId);
    });
}

export function addEventListenerHardWord() {
    document.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).classList.contains('hard-word')) {
            postUserWord((e.target as HTMLElement).id, 'hard');
        }
        if ((e.target as HTMLElement).classList.contains('delete-word')) {
            deleteUserWord((e.target as HTMLElement).id);
        }
    });
}

export function addGameButtons(container2: HTMLElement) {
    const container = document.querySelector(".main") as HTMLElement;
    console.log("it has begun");
    const gameButtons = document.createElement("div");
    gameButtons.classList.add("game-page-buttons");
    gameButtons.innerHTML = `
    <button class="sprint-page-start">Спринт</button>
    <button class="audio-page-start">Аудиовызов</button>
    `
    // const firstElement = container.querySelector("div:first-child") as HTMLElement;
    container.insertBefore(gameButtons, container.firstChild);
}
