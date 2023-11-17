function randInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}

function isEqual(object1, object2) {
	return JSON.stringify(object1) === JSON.stringify(object2);
}