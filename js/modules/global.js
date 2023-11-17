let speed = 150 //скорость игры
const $elBody = document.querySelector('body')
$elBody.style.setProperty('--speed', `${Math.round(speed) / 1000}s`) //скорость игры в css
let fieldSize = 11 //размер поля в квадратиках
const gameField = document.querySelector('.game-field') //объект игрового поля
const Dir = {RIGHT: 0, LEFT: 1, UP: 2, DOWN: 3, ALL: 4} //словарь направлений
let directionArray = [] //массив направлений - очередь
let snakeList = [] //массив змейки - очередь
let startLength = 3 //стартовая длина
let startProgress = 0 //прогресс старта (сколько уже заполнено)
let direction = Dir.RIGHT; //текущее направление
let foodSample
let foodCell
let gameTicker
let gameOnPause = false
let isGameStarted = false

function invertDir(direction) { //поменять направление местами (напр лево на право)
	if (direction === Dir.RIGHT) return Dir.LEFT
	else if (direction === Dir.LEFT) return Dir.RIGHT
	else if (direction === Dir.UP) return Dir.DOWN
	else if (direction === Dir.DOWN) return Dir.UP
	else return Dir.ALL
}

class Score {
	static get $elScoreContainer() {
		return document.querySelector('.score-container')
	}

	static score = 0

	static increase() {
		if (Score.$elScoreContainer.getElementsByClassName('score').length > 1) {
			Array.from(Score.$elScoreContainer.getElementsByClassName('score_old')).forEach($el => {
				$el.remove()
			})
			console.log('too many score elements')
		}
		let $oldScore = Score.$elScoreContainer.querySelector('.score')

		let $newScore = $oldScore.cloneNode(true)

		$oldScore.classList.add('score_old')

		Score.score++
		$newScore.innerHTML = Score.score
		$newScore.classList.add('score_new')
		Score.$elScoreContainer.append($newScore)

		function removeEl($el) {
			$el.remove()
		}

		setTimeout(removeEl, 250, $oldScore)

		function removeClassNew($el) {
			$el.classList.remove('score_new')
		}

		setTimeout(removeClassNew, 30, $newScore)
	}
}