export function statisticButton() {
	const statisticBtns = document.querySelectorAll(".statistic");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function statistic() {
	  return (mainContainer.innerHTML = `
        

      `);
	}
  
	statisticBtns.forEach(sprintBtn => sprintBtn.addEventListener("click", statistic));
  }