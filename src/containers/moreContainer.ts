
export function moreButton() {

	const moreBtn = document.querySelector(".more");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function more() {
	  return (mainContainer.innerHTML = `
        

      `);
	}
  
	moreBtn?.addEventListener("click", more);
  }