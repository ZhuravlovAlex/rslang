import { BASE_URL, Words } from '../api/api';
import { audioButton } from '../containers/audioContainer';
import { sprintButton } from '../containers/sprintContainer';
import { audioPlay } from './audioButton';
import { element } from './paginationUpperIntermediate';


async function upperIntermediateButton() {
    const mainContainer = document.querySelector('.main') as HTMLElement;
    const responseWords = await Words.getWords('3', '');
    mainContainer.innerHTML = `
    <div class="game-buttons">
    <button class="sprint" id="sprint-link-book">Спринт</button>
	<button class="audio" id="audio-link-book">Аудиовызов</button>
    </div>

    <div class="upper-title"><img class="upper-intermediateimg" src="./assets/free-sticker-writing-5720861.png" alt="Upper-Intermediate"><h1 class="title-level">Upper-Intermediate</h1></div>
        ${
            responseWords
                .map(
                    (word) =>
                        `
                    
                    <div class="elementary-container">   
        <div class="words-container">
        <div class="img-container">
        <img class="image" src="${BASE_URL}/${word.image}">
        </div>
        <div class="word-wrapper">
        <div class="word">
        ${word.word} -
        ${word.transcription} -
        ${word.wordTranslate}
        </div>
        <div class="example-first">
        ${word.textMeaning}<br>
        ${word.textMeaningTranslate}
        </div>
        <div class="example-second">
        ${word.textExample}<br>
        ${word.textExampleTranslate}
        </div>
        <div class="audio-container">
        <button class="audio-btn" data-id="${word.id}">
        	&#127911;
        </button>
        <audio id="audio1" src="${BASE_URL}/${word.audio}" data-id="${word.id}"></audio>
        <audio id="audio3" src="${BASE_URL}/${word.audioExample}" data-id="${word.id}"></audio>
        <audio id="audio2" src="${BASE_URL}/${word.audioMeaning}" data-id="${word.id}"></audio>
        </div>
        <div class="word-buttons">
        <button class="hard-word" id="${word.id}">Сложное слово
        </button>
        <button class="delete-word" id="${word.id}">Изученное слово
        </button>
        </div>
        </div>
        </div>
        </div>
        `
                )
                .join('') +
            `
            <div class="pagination">
            <ul></ul>
            </div>`
        }
            
        `;
    audioPlay();
    element(30,1);
    sprintButton();
    audioButton();
}

export const upperIntermediateContainer = () => {
    const upperIntermediateBtn = document.querySelector('.upper-intermediate') as HTMLElement;
    upperIntermediateBtn.addEventListener('click', upperIntermediateButton);
};