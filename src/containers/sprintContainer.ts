export async function sprintButton() {
	const sprintBtn = document.querySelector(".sprint");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function sprint() {
	  return (mainContainer.innerHTML = `
        

      `);
	}
  
	sprintBtn?.addEventListener("click", sprint);
  }