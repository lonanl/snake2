// import {Dir, fieldSize, gameField, speed} from './global.js';

class Cell { //класс ячеек, только координаты
	constructor(x = 0, y = 0) {
		this.x = x
		this.y = y
	}
}

class SnakeCell extends Cell { //класс ячейки змеи
	constructor(cell) {
		super(cell.x, cell.y)
		
		this.$el = gameField.querySelector(`.cell_${this.x}_${this.y}`) //сама ячейка змеи
		this.$parenEl = this.$el.parentElement //родительская ячейка, надо чтобы можно было примагничивать
	}

	#changeCellDirection(directionFrom) { //изменение направления родительской ячейки и ячейки змеи
		this.$el.classList.remove('vertical')
		this.$el.classList.remove('horizontal')
		this.$parenEl.classList.remove('cell-right')
		this.$parenEl.classList.remove('cell-left')
		this.$parenEl.classList.remove('cell-top')
		this.$parenEl.classList.remove('cell-bottom')
		switch (directionFrom) {
			case Dir.RIGHT:
				this.$el.classList.add('vertical')
				this.$parenEl.classList.add('cell-right')
				break
			case Dir.LEFT:
				this.$el.classList.add('vertical')
				this.$parenEl.classList.add('cell-left')
				break
			case Dir.UP:
				this.$el.classList.add('horizontal')
				this.$parenEl.classList.add('cell-top')
				break
			case Dir.DOWN:
				this.$el.classList.add('horizontal')
				this.$parenEl.classList.add('cell-bottom')
				break
			default:
				break
		}
	}

	activate(directionFrom = Dir.ALL) { //активация ячейки змеи
		this.#changeCellDirection(directionFrom) //меняем направление
		setTimeout(activateAddClass, 20, this.$el) //чтобы успели примениться стили и классы направления без анимации

	}


	deactivate(directionFrom = Dir.ALL) {
		this.#changeCellDirection(directionFrom)
		this.$el.classList.add('transition-on')
		this.$el.classList.remove('active')
		setTimeout(disableTransition, speed, this.$el)

		function removeClassColorize($el) {
			$el.classList.remove('colorize-snake')
		}

		setTimeout(removeClassColorize, speed, this.$el)
	}
}

function activateAddClass($el) {
	$el.classList.add('transition-on')
	$el.classList.add('active')
	$el.classList.add('colorize-snake')
	setTimeout(disableTransition, speed, $el)
}

function disableTransition($el) {
	$el.classList.remove('transition-on')
}