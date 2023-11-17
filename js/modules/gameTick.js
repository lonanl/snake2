let startX = randInt(2, fieldSize - 1 - startLength)
let startY = randInt(2, fieldSize - 1 - startLength)
let magic = []

function startGame() {
	if (startProgress < startLength) {
		let currentCell = new Cell(startX + startProgress, startY)
		snakeList.push(currentCell)
		let currentSnakeCell = new SnakeCell(currentCell)
		currentSnakeCell.activate(Dir.LEFT)
		setTimeout(startGame, speed)
		startProgress++
	} else{
		magic = setInterval(Food.generate, 400)
	}
}


function gameTick() {
	while (directionArray.length !== 0) {
		let newDirection = directionArray.shift()
		if (newDirection !== direction && newDirection !== invertDir(direction)) {
			direction = newDirection
			break
		} else if (directionArray.length === 1 && (newDirection === direction || newDirection === invertDir(direction))) {
			directionArray.push(newDirection)
		}
	}
	let nextCell = new Cell()
	if (direction === Dir.RIGHT) {
		nextCell.x = snakeList.at(-1).x + 1
		if (nextCell.x >= fieldSize) nextCell.x = 0
		nextCell.y = snakeList.at(-1).y
	} else if (direction === Dir.LEFT) {
		nextCell.x = snakeList.at(-1).x - 1
		if (nextCell.x < 0) nextCell.x = fieldSize - 1
		nextCell.y = snakeList.at(-1).y
	} else if (direction === Dir.UP) {
		nextCell.y = snakeList.at(-1).y + 1
		if (nextCell.y >= fieldSize) nextCell.y = 0
		nextCell.x = snakeList.at(-1).x
	} else if (direction === Dir.DOWN) {
		nextCell.y = snakeList.at(-1).y - 1
		if (nextCell.y < 0) nextCell.y = fieldSize - 1
		nextCell.x = snakeList.at(-1).x
	}


	snakeList.push(nextCell)
	let nextSnakeCell = new SnakeCell(nextCell)
	nextSnakeCell.activate(invertDir(direction))

	if (!isEqual(nextCell, foodCell)) {
		let deletingSnakeCell = new SnakeCell(snakeList.shift())
		let deletingDirection
		if (deletingSnakeCell.x === snakeList[0].x) {
			if (deletingSnakeCell.y < snakeList[0].y) deletingDirection = Dir.UP
			else deletingDirection = Dir.DOWN
		} else {
			if (deletingSnakeCell.x < snakeList[0].x) deletingDirection = Dir.RIGHT
			else deletingDirection = Dir.LEFT
		}
		if (Math.abs(deletingSnakeCell.y - snakeList[0].y) === fieldSize - 1 ||
			Math.abs(deletingSnakeCell.x - snakeList[0].x) === fieldSize - 1) deletingDirection = invertDir(deletingDirection)
		deletingSnakeCell.deactivate(deletingDirection)
	} else {
		Score.increase()
		$elBody.style.setProperty('--score', `${Score.score + 4 < 15 ? Score.score + 4 : 15}`)
		// $elScore.innerHTML = `${score}`
		let deletingFood = new Food(foodCell)
		deletingFood.erase()
		Food.generate()
	}
	gameTicker = window.setTimeout(gameTick, speed)
}