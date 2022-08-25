export async function savannahButton() {
	const savannahBtn = document.querySelector(".savannah");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function savannah() {
	  return (mainContainer.innerHTML = `
        

      `);
	}
  
	savannahBtn?.addEventListener("click", savannah);
  }