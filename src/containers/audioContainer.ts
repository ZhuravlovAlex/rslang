import { AudioGame } from "../games/audio/audio-game";

export function audioButton() {
	const audioBtns = document.querySelectorAll(".audio");
	const mainContainer = document.querySelector(".main") as HTMLElement;
	function audio() {
		(mainContainer.innerHTML = `
		<h1 class="audio-game-heading">Аудиовызов</h1>
		<div class="audio-game">
		<select class="audio-game-select">
			<h2>Выберите уровень сложности</h2>
			<option value="0">Уровень сложности 1</option>
			<option value="1">Уровень сложности 2</option>
			<option value="2">Уровень сложности 3</option>
			<option value="3">Уровень сложности 4</option>
			<option value="4">Уровень сложности 5</option>
			<option value="5">Уровень сложности 6</option>
		</select>
		<button class="audio-game-start">Начать игру</button>
		</div>
		`);
		const augioGame = new AudioGame(audio);
		const difficultyLevel = document.querySelector('.audio-game-select') as HTMLSelectElement;
		const startGameButton = document.querySelector('.audio-game-start');
		startGameButton!.addEventListener("click", () => {
			const value = difficultyLevel.value;
			augioGame.init(value);
		});
	}
	audioBtns.forEach(audioBtn => audioBtn.addEventListener("click", audio));
}