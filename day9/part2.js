const fileReader = require('../filereader')('input.txt');

class Location {
	constructor(height) {
		this.height = height;
		this.visited = false;
		this.lowPoint = false;
	}
}

const visitLocation = (map, rowIndex, locationIndex) => {
	if (map[rowIndex][locationIndex].height === '9' || map[rowIndex][locationIndex].visited) {
		return 0;
	}

	map[rowIndex][locationIndex].visited = true;

	let count = 1;

	if (map[rowIndex - 1] !== undefined) {
		count += visitLocation(map, rowIndex - 1, locationIndex);
	}
	if (map[rowIndex + 1] !== undefined) {
		count += visitLocation(map, rowIndex + 1, locationIndex);
	}
	if (map[rowIndex][locationIndex - 1] !== undefined) {
		count += visitLocation(map, rowIndex, locationIndex - 1);
	}
	if (map[rowIndex][locationIndex + 1] !== undefined) {
		count += visitLocation(map, rowIndex, locationIndex + 1);
	}

	return count;
}

const map = [];
const basins = [];

fileReader.on('line', input => {
	map.push(input.split('').map(height => new Location(height)));
});

fileReader.on('close', () => {
	map.forEach((row, rowIndex) => {
		row.forEach((location, locationIndex) => {
			const basinSize = visitLocation(map, rowIndex, locationIndex);
			if (basinSize > 0) {
				basins.push(basinSize);
			}
		})
	})

	basins.sort((a,b) => b - a);

	console.log(basins[0] * basins[1] * basins[2]);
});