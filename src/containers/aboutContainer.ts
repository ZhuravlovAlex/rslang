export function aboutButton() {
	const aboutBtn = document.querySelector(".about");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function about() {
	  return (mainContainer.innerHTML = `
        

      `);
	}
  
	aboutBtn?.addEventListener("click", about);
  }