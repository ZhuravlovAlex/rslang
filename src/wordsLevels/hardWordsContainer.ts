import { addEventListenerHardWord } from "../utils/utils";

async function hardWordsButton() {
    const mainContainer = document.querySelector('.main') as HTMLElement;
    mainContainer.innerHTML = `
                    
                    <div class="elementary-container">  
       
        </div>
        `;
    addEventListenerHardWord();
}

export const hardWordsContainer = () => {
    const hardwordsBtn = document.querySelector('.hard-words') as HTMLElement;
    hardwordsBtn.addEventListener('click', hardWordsButton);
};