import { SprintGame } from '../games/sprint/sprint';
export function sprintButton() {
    const sprintGame = new SprintGame(sprint);
    const sprintBtns = document.querySelectorAll('.sprint');
    const mainContainer = document.querySelector('.main') as HTMLElement;
    function sprint() {
        (mainContainer.innerHTML = `
		<h1 class="audio-game-heading">Спринт</h1>
		<div class="sprint-game">
		<select class="sprint-game-select">
			<h2>Выберите уровень сложности</h2>
			<option value="0">Уровень сложности 1</option>
			<option value="1">Уровень сложности 2</option>
			<option value="2">Уровень сложности 3</option>
			<option value="3">Уровень сложности 4</option>
			<option value="4">Уровень сложности 5</option>
			<option value="5">Уровень сложности 6</option>
		</select>
		<button class="sprint-game-start">Начать игру</button>
		</div>
		`);
        const difficultyLevel = document.querySelector('.sprint-game-select') as HTMLSelectElement;
        const startGameButton = document.querySelector('.sprint-game-start');
        startGameButton!.addEventListener("click", () => {
            const value = difficultyLevel.value;
            startSprintGame(sprintGame, value);
        });
    }

    function startSprintGame(sprintGame: SprintGame, group: string) {
        mainContainer.innerHTML = `
        <img class="sprint-img" src="./assets/free-sticker-solar-system-5720942.png" alt="sprint">
		<div class="sprint-game">
		<h2 class="timer"></h2>
		<h3 class="points">0</h3>
		<div class="stars"></div>
		<img class="sprint-image" src="./assets/sprint-game/01.png" alt="">
		<p class="sprint-word"></p>
		<p class="translation"></p>
		<div class="sprint-buttons">
		<button class="wrong">Неверно</button>
		<button class="correct">Верно</button>
		</div>
		</div>
    `;
        const points: HTMLHeadingElement = mainContainer.querySelector('.points') as HTMLHeadingElement;
        const correctButton: HTMLButtonElement = mainContainer.querySelector('.correct') as HTMLButtonElement;
        const wrongButton: HTMLButtonElement = mainContainer.querySelector('.wrong') as HTMLButtonElement;
        document.onkeydown = (e) => {

            if (e.key === 'ArrowLeft') {
                wrongButton.click();
            }
            if (e.key === 'ArrowRight') {
                correctButton.click()
            };
        };
        correctButton.addEventListener('click', () => {
            sprintGame.answerQuestion(points, true);
        });
        wrongButton.addEventListener('click', () => {
            sprintGame.answerQuestion(points, false);
        });
        sprintGame.init(group);
    }

    sprintBtns.forEach((sprintBtn) => sprintBtn.addEventListener('click', sprint));
}
