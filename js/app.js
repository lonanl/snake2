// import {Cell} from './modules/cell.js'
// import {Dir, fieldSize, gameField, speed} from "./modules/global.js";

app()

function app() {

	let cellSample = gameField.querySelector('.cell').cloneNode(true)
	document.querySelector('.cell').remove()
	foodSample = cellSample.querySelector('.food').cloneNode(true)
	cellSample.querySelector('.food').remove()
	console.log(cellSample)


	let row_sample = gameField.querySelector('.column').cloneNode(true)
	document.querySelector('.column').remove()

	for (let x = 0; x < fieldSize; x++) {
		let current_row = row_sample.cloneNode(true)
		for (let y = 0; y < fieldSize; y++) {
			let current_cell = cellSample.cloneNode(true)
			current_cell.querySelector('.cell-content').classList.add(`cell_${x}_${y}`)
			current_row.append(current_cell)
		}
		gameField.appendChild(current_row)
	}

	setTimeout(startGame, 1000)
}