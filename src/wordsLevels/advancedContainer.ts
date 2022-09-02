export const advancedContainer = () => {
    const advancedBtn = document.querySelector(".advanced") as HTMLElement;
    const mainContainer = document.querySelector(".main") as HTMLElement;
    function advancedButton() {
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
    advancedBtn.addEventListener("click", advancedButton);
  };