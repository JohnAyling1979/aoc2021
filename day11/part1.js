const fileReader = require('../filereader')('input.txt');

const octopuses = [];
let flashes = 0;

class Octopus {
	constructor(x, y, level) {
		this.x = x;
		this.y = y;
		this.level = level;
	}

	increase() {
		this.level++;

		if (this.level === 10) {
			this.flash();
		}
	}

	flash() {
		flashes++;

		if (octopuses[this.x - 1] !== undefined) {
			if (octopuses[this.x - 1][this.y - 1] !== undefined) {
				octopuses[this.x - 1][this.y - 1].increase();
			}
			if (octopuses[this.x - 1][this.y] !== undefined) {
				octopuses[this.x - 1][this.y].increase();
			}
			if (octopuses[this.x - 1][this.y + 1] !== undefined) {
				octopuses[this.x - 1][this.y + 1].increase();
			}
		}

		if (octopuses[this.x][this.y - 1] !== undefined) {
			octopuses[this.x][this.y - 1].increase();
		}

		if (octopuses[this.x][this.y + 1] !== undefined) {
			octopuses[this.x][this.y + 1].increase();
		}

		if (octopuses[this.x + 1] !== undefined) {
			if (octopuses[this.x + 1][this.y - 1] !== undefined) {
				octopuses[this.x + 1][this.y - 1].increase();
			}
			if (octopuses[this.x + 1][this.y] !== undefined) {
				octopuses[this.x + 1][this.y].increase();
			}
			if (octopuses[this.x + 1][this.y + 1] !== undefined) {
				octopuses[this.x + 1][this.y + 1].increase();
			}
		}
	}

	reset() {
		this.level = 0;
	}
}

let x = 0;

fileReader.on('line', input => {
	octopuses.push(input.split('').map((level, y) => new Octopus(x, y, parseInt(level))));

	x++;
});

fileReader.on('close', () => {
	for (let step = 0; step < 100; step++) {
		octopuses.forEach(row => {
			row.forEach(octopuse => {
				octopuse.increase();
			})
		})
		octopuses.forEach(row => {
			row.forEach(octopuse => {
				if (octopuse.level > 9) {
					octopuse.reset();
				}
			})
		})
	}

	console.log(flashes);
});