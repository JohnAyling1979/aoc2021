const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
	input: fs.createReadStream('input.txt'),
	console: false
});

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

const points = {};

reader.on('line', input => {
	const line = input.split('->').map(point => point.trim().split(',').map(point => parseInt(point)));

	if (line[0][0] === line[1][0]) {
		let change = 1;

		if (line[0][1] > line[1][1]) {
			change *= -1
		}

		while (line[0][1] !== line[1][1]) {
			const key = line[0].join(',');

			if (points[key] !== undefined) {
				points[key].increasePass();
			} else {
				points[key] = new Point(line[0]);
			}

			line[0][1] += change;
		}

		const key = line[0].join(',');

		if (points[key] !== undefined) {
			points[key].increasePass();
		} else {
			points[key] = new Point(line[0]);
		}

	} else if (line[0][1] === line[1][1]) {
		let change = 1;

		if (line[0][0] > line[1][0]) {
			change *= -1;
		}

		while (line[0][0] !== line[1][0]) {
			const key = line[0].join(',');

			if (points[key] !== undefined) {
				points[key].increasePass();
			} else {
				points[key] = new Point(line[0]);
			}

			line[0][0] += change;
		}

		const key = line[0].join(',');

		if (points[key] !== undefined) {
			points[key].increasePass();
		} else {
			points[key] = new Point(line[0]);
		}
	} else {
		let xChange = 1;
		let yChange = 1;

		if (line[0][0] > line[1][0]) {
			xChange *= -1;
		}

		if (line[0][1] > line[1][1]) {
			yChange *= -1
		}


		while (line[0][0] !== line[1][0]) {
			const key = line[0].join(',');

			if (points[key] !== undefined) {
				points[key].increasePass();
			} else {
				points[key] = new Point(line[0]);
			}

			line[0][0] += xChange;
			line[0][1] += yChange;
		}

		const key = line[0].join(',');

		if (points[key] !== undefined) {
			points[key].increasePass();
		} else {
			points[key] = new Point(line[0]);
		}
	}
});

reader.on('close', () => {
	let count = 0;

	Object.values(points).forEach(point => {
		if (point.hit >= 2) {
			count++
		}
	})

	console.log(count);
});