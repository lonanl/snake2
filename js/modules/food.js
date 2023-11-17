class Food extends Cell {
	constructor(cell) {
		super(cell.x, cell.y)
	}


	create() {
		let snakeCell = new SnakeCell(this)
		this.$parentEl = snakeCell.$parenEl

		this.foodEl = foodSample.cloneNode(true)
		this.$parentEl.append(this.foodEl)
		this.foodEl.classList.remove('food-hidden')
		//
		// function removeHiddenClass(foodEl) {
		// 	foodEl.classList.remove('food-hidden')
		// }

		// setTimeout(removeHiddenClass, 30, this.foodEl)

		function magicErase(foodEl) {
			foodEl.erase()
		}

		if(!isGameStarted) {
			setTimeout(magicErase, randInt(500, 1500), this)
		}
	}

	erase() {
		let snakeCell = new SnakeCell(this)
		let $parentEl = snakeCell.$parenEl
		let $foodEl = $parentEl.querySelector('.food')
		$foodEl.classList.add('food-hidden')

		function removeFoodEl($foodEl) {
			$foodEl.remove()
		}

		setTimeout(removeFoodEl, 300, $foodEl)

	}

	static generate() {

		let isFoodInSnake = true
		while (isFoodInSnake) {
			isFoodInSnake = false
			foodCell = new Cell(randInt(0, fieldSize - 1), randInt(0, fieldSize - 1))
			// food = new Cell(2,0)
			snakeList.forEach(cell => {
				if (isEqual(foodCell, cell)) isFoodInSnake = true
			})
		}
		// console.log(foodCell)

		let food = new Food(foodCell)
		food.create()
	}
}