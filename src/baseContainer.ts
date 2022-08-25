export async function baseContainer() {
    const baseContainer = document.querySelector('.base') as HTMLDivElement;
  
    baseContainer.innerHTML = `
  
	<div class="wrapper">
    <header class="header">
			<div class="header-nav">
			<a class="header-link" href="../index.html"><h2 class="rs-lang">RS Lang</h2></a>
			<div class="header-buttons">
			<button class="theme">&#9790;</button>
			<button class="authorization">&#9094;</button>
			  <div class="menu">
  <button class="menu-btn">☰</button>
  <div class="menu-content">
    <a href="#">Учебник</a>
    <a href="#">Статистика</a>
    <a href="#">Саванна</a>
	<a href="#">Спринт</a>
	<a href="#">Аудиовызов</a>
	<a href="#">Написание</a>
  </div>
</div>
		</div>
		</div>
		</header>
		<main class="main">
		<div class="nav">
			<button class="book">Учебник</button>
			<button class="statistic">Статистика</button>
			<button class="savannah">Саванна</button>
			<button class="sprint">Спринт</button>
			<button class="audio">Аудиовызов</button>
			<button class="writing">Написание</button>
		  </div>

		  <div class="information">
			  <div class="information-buttons">
			  <button class="more">Узнать больше о приложении</button>
			  <button class="start">Начать изучение</button>
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
  }