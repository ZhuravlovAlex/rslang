export async function audioButton() {
	const audioBtn = document.querySelector(".audio");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function audio() {
	  return (mainContainer.innerHTML = `
        

      `);
	}
  
	audioBtn?.addEventListener("click", audio);
  }