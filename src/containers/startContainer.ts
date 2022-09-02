export function startButton() {
	const startBtn = document.querySelector(".start");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function start() {
	  return (mainContainer.innerHTML = `
        

      `);
	}
  
	startBtn?.addEventListener("click", start);
  }