export async function videoButton() {
	const videoBtn = document.querySelector(".video");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function video() {
	  return (mainContainer.innerHTML = `
        

      `);
	}
  
	videoBtn?.addEventListener("click", video);
  }