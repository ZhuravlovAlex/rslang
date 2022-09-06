
export function moreButton() {

	const moreBtn = document.querySelector(".more");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function more() {
	  return (mainContainer.innerHTML = `
        <div class="more-container">
		<div class="more-title-container"><img class="more-diploma" src="./assets/free-sticker-diploma-5720735.png" alt="diplom"><h1 class="more-title">Начни изучать английский язык прямо сейчас!</h1></div>
		<p class="more-text">Приложение RSLang — это один из самых приятных и быстрых способов выучить английский язык. Внутри собраны разнообразные уроки, которые помогут превратить изучение английского языка в увлекательную игру. Вместо знакомой по школе зубрёжки предлагают познавать новое с помощью аудиозаписей, картинок, а запоминать материал — путём выполнения интересных по механике заданий.</p>
		</div>

      `);
	}
  
	moreBtn?.addEventListener("click", more);
  }