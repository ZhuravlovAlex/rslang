import { SprintGame } from "../games/sprint/sprint";
export async function sprintButton() {
	const sprintBtn = document.querySelector(".sprint");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	function sprint() {
		(mainContainer.innerHTML = `
		<div class="spring-game">
		<h2 class="timer"></h2>
		<h3 class="points">0</h3>
		<p class="word"></p>
		<p class="translation"></p>
		<button class="wrong">Неверно</button>
		<button class="correct">Верно</button>
		</div>
    `);
		const timer: HTMLHeadingElement = mainContainer.querySelector('.timer') as HTMLHeadingElement;
		const points: HTMLHeadingElement = mainContainer.querySelector('.points') as HTMLHeadingElement;
		const correctButton: HTMLButtonElement = mainContainer.querySelector('.correct') as HTMLButtonElement;
		const wrongButton: HTMLButtonElement = mainContainer.querySelector('.wrong') as HTMLButtonElement;
		const word: HTMLParagraphElement = mainContainer.querySelector('.word') as HTMLParagraphElement;
		const translation: HTMLParagraphElement = mainContainer.querySelector('.translation') as HTMLParagraphElement;
		const springGame = new SprintGame(word, translation, timer);
		document.addEventListener('keydown', (e) => {
			console.log(e.key);

			if (e.key === "ArrowLeft") springGame.answerQuestion(points, false);
			if (e.key === "ArrowRight") springGame.answerQuestion(points, true);
		});
		springGame.startGame();
		// springGame.updateStatistics();
		correctButton.addEventListener("click", () => { springGame.answerQuestion(points, true) });
		wrongButton.addEventListener("click", () => { springGame.answerQuestion(points, false) });
	}
	sprintBtn?.addEventListener("click", sprint);
}