export function audioButton() {
	const audioBtns = document.querySelectorAll(".audio");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function audio() {
	  return (mainContainer.innerHTML = `
        

      `);
	}
  
	audioBtns.forEach(audioBtn => audioBtn.addEventListener("click", audio));
  }