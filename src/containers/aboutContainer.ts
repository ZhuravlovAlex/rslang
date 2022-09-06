export function aboutButton() {
    const aboutBtn = document.querySelector('.about');
    const mainContainer = document.querySelector('.main') as HTMLElement;
    async function about() {
        return (mainContainer.innerHTML = `
	  <div class="about-container">

	  <div class="about-wrapper">
	  <div class="about-title-container"><img class="about-container-img" src="./assets/about/photo_2022-09-06 02.40.48.jpeg" alt="about"><h1 class="book-title">Анастасия Мацур</h1></div>
	  <a class="member-link" href="https://github.com/Nastik95">https://github.com/Nastik95</a>
	  <p class="about-text">Вёрстка, учебник, список слов</p>
	  </div>

	  <div class="about-wrapper">
	  <div class="about-title-container"><img class="about-container-img" src="./assets/about/avatar.jpg" alt="about"><h1 class="book-title">Алексей Журавлев</h1></div>
	  <a class="member-link" href="https://github.com/ZhuravlovAlex">https://github.com/ZhuravlovAlex</a>
	  <p class="about-text">Репозиторий, вебпак, авторизация, статистика</p>
	  </div>

	  <div class="about-wrapper">
	  <div class="about-title-container"><img class="about-container-img" src="./assets/about/photo_2022-09-06 02.43.08.jpeg" alt="about"><h1 class="book-title">Александр Голубович</h1></div>
	  <a class="member-link" href="https://github.com/FeuerImBlut">https://github.com/FeuerImBlut</a>
	  <p class="about-text">API, спринт, аудиовызов</p>
	  </div>
	  
	  </div>

      `);
    }

    aboutBtn?.addEventListener('click', about);
}
