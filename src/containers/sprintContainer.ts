export function sprintButton() {
	const sprintBtns = document.querySelectorAll(".sprint");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function sprint() {
	  return (mainContainer.innerHTML = `
        

      `);
	}
  
	sprintBtns.forEach(sprintBtn => sprintBtn.addEventListener("click", sprint));
  }