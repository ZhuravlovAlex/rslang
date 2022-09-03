import { advancedContainer } from "../wordsLevels/advancedContainer";
import { elementaryContainer } from "../wordsLevels/elementaryContainer";
import { intermediateContainer } from "../wordsLevels/intermediateContainer";
import { preIntermediateContainer } from "../wordsLevels/preIntermediateContainer";
import { profiencyContainer } from "../wordsLevels/profiencyContainer";
import { upperIntermediateContainer } from "../wordsLevels/upperIntermediateContainer";

const bookButton = async () => {
  const mainContainer = document.querySelector(".main") as HTMLElement;
  mainContainer.innerHTML = `
  <div class="levels">
  <h1 class="book-title">Уровни сложности</h1>
  <div class="book-nav">
    <div class="book-buttons">
      <button class="elementary" class="button-level">A1 Elementary</button>
      <button class="pre-intermediate" class="button-level">A2 Pre-Intermediate</button>
      <button class="intermediate" class="button-level">B1 Intermediate</button>
      <button class="upper-intermediate" class="button-level">B2 Upper-Intermediate</button>
      <button class="advanced" class="button-level">C1 Advanced</button>
      <button class="profiency" class="button-level">C2 Profiency</button>
    </div>
  </div>
  </div>
    `;
  elementaryContainer();
  intermediateContainer();
  upperIntermediateContainer();
  advancedContainer();
  preIntermediateContainer();
  profiencyContainer();
};

export const bookContainerRender = () => {
  const bookBtns = document.querySelectorAll(".book");

  bookBtns.forEach(bookBtn => bookBtn.addEventListener("click", bookButton));
};