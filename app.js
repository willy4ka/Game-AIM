const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;
const hex = [
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F",
]
// Следующий экран
startBtn.addEventListener('click', (event) => {
	event.preventDefault();
	screens[0].classList.add('up');
});
// Следующий экран, выбор времени игры
timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up');
		startGame()
	}
})
// Добавление очка за нажатие по кругу
board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createRandomCircle();
	}
})
// Старт и оставшееся время игры
function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle()
	setTime(time);
}
// Оставшееся время игры
function decreaseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current);
	}

}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`
}

function finishGame() {
	timeEl.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}
// Создание рандомного круга
function createRandomCircle() {
	const circle = document.createElement('div');
	const size = getRandomNumber(30, 40);
	const {
		width,
		height
	} = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);

	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	let hexColor = generateHex();
	circle.style.backgroundColor = hexColor;

	board.append(circle);
}
function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

// COLOR
function generateHex() {
	let hexColor = "#";
	for (let i = 0; i < 6; i++) {
		hexColor += hex[getRandomNumberHex()]
	}

	return hexColor;
}
function getRandomNumberHex() {
	return Math.floor(Math.random() * hex.length);
}

// Хак для большего набора очков
function winTheGame() {
	function kill() {
		const circle = document.querySelector('.circle');
		if (circle) {
			circle.click();
		}
	}
	setInterval(kill, 40)
}

// winTheGame();