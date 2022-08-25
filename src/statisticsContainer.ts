export async function statisticButton() {
	const statisticBtn = document.querySelector(".statistic");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function statistic() {
	  return (mainContainer.innerHTML = `
        

      `);
	}
  
	statisticBtn?.addEventListener("click", statistic);
  }