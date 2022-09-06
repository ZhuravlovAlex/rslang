
export function videoButton() {

	const videoBtn = document.querySelector(".video");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	async function video() {
	  return (mainContainer.innerHTML = `
	  <div class="video-container">
	  <div class="book-wrapper">
	  <div class="book-title-container"><img class="book-container-img" src="./assets/free-sticker-open-book-5720751.png" alt="book"><h1 class="book-title">Учебник</h1></div>
	  <p class="book-text">С помощью учебника RSLang Вы сможете изучить слова всех уровней сложности и это будет интересно! Мы создали удобный формат обучения за счёт объединения слова, транскрипции, примера предложения, перевода и аудио в одно целое.</p>
	  </div>
	  <div class="statistic-wrapper">
	  <div class="statistic-title-container"><img class="statistic-container-img" src="./assets/free-sticker-calculator-5721117.png" alt="statistic"><h1 class="statistic-title">Статистика</h1></div>
	  <p class="statistic-text">С помощью статистики Вы сможете увидеть результаты своего обучения, которые будут мотивировать Вас, а также подскажут над чем ещё стоит поработать.</p>
	  </div>
	  <div class="sprint-wrapper">
	  <div class="sprint-title-container"><img class="sprint-container-img" src="./assets/free-sticker-solar-system-5720942.png" alt="sprint"><h1 class="sprint-title">Спринт</h1></div>
	  <p class="sprint-text">С помощью мини-игры Спринт Вы сможете потренировать свою внимательность и скорость в переводе английских слов. Это поможет Вам приспособиться к различным ситуациям.</p>
	  </div>
	  <div class="audio-wrapper">
	  <div class="audio-title-container"><img class="audio-container-img" src="./assets/free-sticker-flute-5721011.png" alt="audio"><h1 class="audio-title">Аудиовызов</h1></div>
	  <p class="audio-text">С помощью мини-игры Аудиовызов Вы сможете научиться воспринимать на слух английские слова, что значительно упростит Вам жизнь при общении с иностранными друзьями, коллегами и знакомыми.</p>
	  </div>
	  </div>

      `);
	}
  
	videoBtn?.addEventListener("click", video);
  }