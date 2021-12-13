const fileReader = require('../filereader')('input.txt');

const map = [];
const lowPoint = [];

fileReader.on('line', input => {
	map.push(input.split(''));
});

fileReader.on('close', () => {
	map.forEach((row, rowIndex) => {
		row.forEach((location, locationIndex) => {
			let up = down = left = right = 10;

			if (map[rowIndex - 1] !== undefined) {
				up = map[rowIndex - 1][locationIndex];
			}
			if (map[rowIndex + 1] !== undefined) {
				down = map[rowIndex + 1][locationIndex];
			}
			if (map[rowIndex][locationIndex - 1] !== undefined) {
				left = map[rowIndex][locationIndex - 1];
			}
			if (map[rowIndex][locationIndex + 1] !== undefined) {
				right = map[rowIndex][locationIndex + 1];
			}

			if (
				location < up &&
				location < down &&
				location < left &&
				location < right
			) {
					lowPoint.push(location);
				}
		})
	})


	console.log(lowPoint.reduce((sum, location) => sum + parseInt(location) + 1, 0));
});