document.addEventListener('keydown', function (event) {
		console.log('Key: ', event.key);
		if (directionArray.length < 2 && event.repeat === false) {
			if (['ArrowUp', 'w'].includes(event.key) && ![Dir.UP, Dir.DOWN].includes(directionArray.at(-1))) {
				directionArray.unshift(Dir.UP)
			}
			if (['ArrowDown', 's'].includes(event.key) && ![Dir.UP, Dir.DOWN].includes(directionArray.at(-1))) {
				directionArray.unshift(Dir.DOWN)
			}
			if (['ArrowRight', 'd'].includes(event.key) && ![Dir.LEFT, Dir.RIGHT].includes(directionArray.at(-1))) {
				directionArray.unshift(Dir.RIGHT)
			}
			if (['ArrowLeft', 'a'].includes(event.key) && ![Dir.LEFT, Dir.RIGHT].includes(directionArray.at(-1))) {
				directionArray.unshift(Dir.LEFT)
			}
		}
		if ([' ', 'Escape'].includes(event.key) && event.repeat === false && isGameStarted) {
			if (gameOnPause) {
				gameTick()
				gameOnPause = false
			} else {
				clearTimeout(gameTicker)
				gameOnPause = true
			}
		}
		if (['ArrowUp', 'w', 'ArrowDown', 's', 'ArrowRight', 'd', 'ArrowLeft', 'a', ' '].includes(event.key) && !isGameStarted) {
			isGameStarted = true;
			gameTick()
			clearInterval(magic)
			Food.generate()
		}
	}
)

document.addEventListener("visibilitychange", function () {
	if (document.hidden) {
		clearTimeout(gameTicker)
		console.log('pause')
	} else {
		if (!gameOnPause && isGameStarted) {
			gameTick()
			console.log('restart')
		}
	}
});