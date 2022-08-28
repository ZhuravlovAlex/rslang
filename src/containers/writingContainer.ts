export async function writingButton() {
	const writingBtn = document.querySelector(".writing");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function writing() {
	  return (mainContainer.innerHTML = `
        

      `);
	}
  
	writingBtn?.addEventListener("click", writing);
  }