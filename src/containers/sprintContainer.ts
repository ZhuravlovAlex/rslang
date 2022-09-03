import { SprintGame } from "../games/sprint/sprint";
export async function sprintButton() {
	const sprintBtn = document.querySelector(".sprint");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	function sprint() {
		(mainContainer.innerHTML = `
		<div class="sprint-game">
		<h2 class="timer"></h2>
		<h3 class="points">0</h3>
		<div class="stars"></div>
		<img class="sprint-image" src="../assets/sprint-game/01.png" alt="">
		<p class="sprint-word"></p>
		<p class="translation"></p>
		<div class="sprint-buttons">
		<button class="wrong">Неверно</button>
		<button class="correct">Верно</button>
		</div>
		</div>
    `);
		const timer: HTMLHeadingElement = mainContainer.querySelector('.timer') as HTMLHeadingElement;
		const points: HTMLHeadingElement = mainContainer.querySelector('.points') as HTMLHeadingElement;
		const correctButton: HTMLButtonElement = mainContainer.querySelector('.correct') as HTMLButtonElement;
		const wrongButton: HTMLButtonElement = mainContainer.querySelector('.wrong') as HTMLButtonElement;
		const word: HTMLParagraphElement = mainContainer.querySelector('.sprint-word') as HTMLParagraphElement;
		const translation: HTMLParagraphElement = mainContainer.querySelector('.translation') as HTMLParagraphElement;
		const bonusImage: HTMLImageElement = mainContainer.querySelector('.sprint-image') as HTMLImageElement;
		const springGame = new SprintGame(word, translation, timer, bonusImage);
		document.addEventListener('keydown', (e) => {
			console.log(e.key);

			if (e.key === "ArrowLeft") {
				wrongButton.click();
			} //springGame.answerQuestion(points, false);
			if (e.key === "ArrowRight") springGame.answerQuestion(points, true);
		});
		springGame.startGame();
		// springGame.updateStatistics();
		correctButton.addEventListener("click", () => {
			springGame.answerQuestion(points, true)
		});
		wrongButton.addEventListener("click", () => { springGame.answerQuestion(points, false) });
	}
	sprintBtn?.addEventListener("click", sprint);
}