const fileReader = require('../filereader')('input.txt');

class Point {
	constructor(point) {
		this.x = point[0];
		this.y = point[1];
		this.hit = 1;
	}

	increasePass() {
		this.hit++;
	}
}

const passOver = point => {
	const key = point.join(',');

	if (points[key] !== undefined) {
		points[key].increasePass();
	} else {
		points[key] = new Point(point);
	}
}

const getChange = reverse => {
	let changeAmount = 1;

	if (reverse) {
		changeAmount *= -1
	}

	return changeAmount;
}

const points = {};

fileReader.on('line', input => {
	const line = input.split('->').map(point => point.trim().split(',').map(point => parseInt(point)));

	if (line[0][0] === line[1][0]) {
		const change = getChange(line[0][1] > line[1][1]);

		while (line[0][1] !== line[1][1]) {
			passOver(line[0]);

			line[0][1] += change;
		}

		passOver(line[0]);
	} else if (line[0][1] === line[1][1]) {
		const change = getChange(line[0][0] > line[1][0]);

		while (line[0][0] !== line[1][0]) {
			passOver(line[0]);

			line[0][0] += change;
		}

		passOver(line[0]);
	} else {
		const xChange = getChange(line[0][0] > line[1][0]);
		const yChange = getChange(line[0][1] > line[1][1]);

		while (line[0][0] !== line[1][0]) {
			passOver(line[0]);

			line[0][0] += xChange;
			line[0][1] += yChange;
		}

		passOver(line[0]);
	}
});

fileReader.on('close', () => {
	let count = 0;

	Object.values(points).forEach(point => {
		if (point.hit >= 2) {
			count++
		}
	})

	console.log(count);
});