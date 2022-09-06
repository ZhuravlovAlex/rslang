export const upperIntermediateContainer = () => {
    const upperIntermediateBtn = document.querySelector(".upper-intermediate") as HTMLElement;
    const mainContainer = document.querySelector(".main") as HTMLElement;
    function upperIntermediateButton() {
        (mainContainer.innerHTML = `
        <div class="elementary-container">
        <div class="words-container">
        <div class="img-container">

        </div>
        <div class="word-wrapper">
        <div class="word">
        </div>
        <div class="example-first">
        </div>
        <div class="example-second">
        </div>
        <div class="audio-container">
        <button class="audio-btn">
        </button>
        </div>
        <div class="word-buttons">
        <button class="hard-word">
        </button>
        <button class="delete-word">
        </button>
        </div>
        </div>
        </div>
        </div>
        `);
      }
      upperIntermediateBtn.addEventListener("click", upperIntermediateButton);
  };