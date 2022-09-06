export function baseContainer() {
    const baseContainer = document.querySelector('.base') as HTMLDivElement;

    baseContainer.innerHTML = `
  
	<div class="wrapper">
    <header class="header">
			<div class="header-nav">
			<a class="header-link" href="../"><h2 class="rs-lang">RS Lang<img class="lang-picture" src="./assets/free-sticker-pencil-5720777.png" alt="pencil"></h2></a>
			<div class="header-buttons">
			<button class="authorization">&#9094;</button>
			  <div class="menu">
  <button class="menu-btn" id="burger-menu">☰</button>
  <div class="menu-content">
    <button class="book" id="book-link">Учебник</button>
    <button class="statistic" id="statistic-link">Статистика</button>
	<button class="sprint" id="sprint-link">Спринт</button>
	<button class="audio" id="audio-link">Аудиовызов</button>
  </div>
</div>
		</div>
		</div>
		</header>
		<main class="main">
		<div class="nav" id="nav-menu">
			<button class="book">Учебник</button>
			<button class="statistic">Статистика</button>
			<button class="sprint">Спринт</button>
			<button class="audio">Аудиовызов</button>
		  </div>

		  <div class="information">
			  <div class="information-buttons">
				<button class="pr">Pull Request  <a href="https://github.com/ZhuravlovAlex/rslang/pull/23">https://github.com/ZhuravlovAlex/rslang/pull/23</a></button>
			  <button class="more">Узнать больше о приложении</button>
			  <button class="video">Как работает приложение</button>
			  <button class="about">О команде</button>
			  </div>
		  </div>
		</main>
		
		<footer class="footer-wrapper">
		<div class="footer">
			<div class="footer-nav">
				<a href="https://rs.school/js/"><img class="logo" src="./assets/rslogo.png" alt="rs-logo"></a>
			</div>
			<div class="github">
			<p class="year">Created at 2022:</p>
			<a class="creator-link" href="https://github.com/Nastik95"><h2 class="name">@Nastik95</h2></a>
			<a class="creator-link" href="https://github.com/ZhuravlovAlex"><h2 class="name">@ZhuravlovAlex</h2></a>
			<a class="creator-link" href="https://github.com/FeuerImBlut"><h2 class="name">@FeuerImBlut</h2></a>
			</div>
			</div>
		</footer>
		</div>
      `;

    let menu = document.getElementById('nav-menu');
    const burgerMenu = document.getElementById('burger-menu');
    if (!menu || !burgerMenu) return;
    if (!localStorage.getItem('token')) {
        menu.style.display = 'none';
        burgerMenu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
        burgerMenu.style.display = 'block';
    }
}
