async function audioBtnWordHandler(event: Event) {
    const audioId = (event.target as HTMLElement).dataset.id;
    const audioWord = document.querySelector(
      `#audio1[data-id="${audioId}"]`
    ) as HTMLAudioElement;
    const audioExample = document.querySelector(
      `#audio3[data-id="${audioId}"]`
    ) as HTMLAudioElement;
    const audioMeaning = document.querySelector(
      `#audio2[data-id="${audioId}"]`
    ) as HTMLAudioElement;
    audioWord.play();
    audioWord.onended = function () {
      audioMeaning.play();
      audioMeaning.onended = function () {
        audioExample.play();
      };
    };
  }
  
  export const audioPlay = () => {
    const audioBtns = document.querySelectorAll(".audio-btn");
  
    audioBtns?.forEach((audioBtn) =>
      audioBtn.addEventListener("click", audioBtnWordHandler)
    );
  };