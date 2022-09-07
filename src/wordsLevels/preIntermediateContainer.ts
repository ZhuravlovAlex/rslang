import { BASE_URL, Words } from '../api/api';
import { audioPlay } from './audioButton';
import { element } from './paginationPreIntermediate';


async function preIntermediateButton() {
    const mainContainer = document.querySelector('.main') as HTMLElement;
    const responseWords = await Words.getWords('1', '');
    mainContainer.innerHTML = `
    <div class="pre-title"><img class="pre-intermediateimg" src="./assets/free-sticker-highlight-5720922.png" alt="Pre-Intermediate"><h1 class="title-level">Pre-Intermediate</h1></div>
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
        <button class="delete-word" id="${word.id}">Удалить слово
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
}

export const preIntermediateContainer = () => {
    const preIntermediateBtn = document.querySelector('.pre-intermediate') as HTMLElement;
    preIntermediateBtn.addEventListener('click', preIntermediateButton);
};
