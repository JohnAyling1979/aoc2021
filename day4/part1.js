const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
	input: fs.createReadStream('input.txt'),
	console: false
});

class Space {
	constructor(value) {
		this.value = value;
		this.marked = false;
	}

	markSpace() {
		this.marked = true;
	}
}

class Board {
	constructor() {
		this.spaces = [];
	}

	addRow(row) {
		this.spaces.push(row)
	}

	markBoard(number) {
		this.spaces.forEach(row => {
			row.forEach(space => {
				if (space.value === number) {
					space.markSpace();
				}
			})
		});
	}

	won() {
		for (let index = 0; index < 5; index++) {
			if (this.spaces[index].filter(space => space.marked).length === 5) {
				return true;
			}
		}

		for (let index = 0; index < 5; index++) {
			const column = [];

			this.spaces.forEach(row => {
				if (row[index].marked) {
					column.push(true);
				}
			});

			if (column.length === 5) {
				return true;
			}
		}

		return false;
	}

	score(number) {
		return number * this.spaces.reduce((sum, row) => {
			return sum + row.reduce((rowSum, space) => {
				if (!space.marked) {
					rowSum += parseInt(space.value);
				}
				return rowSum;
			}, 0);
		}, 0);
	}
}

let firstLine = true;
let firstwin = true
let numbers;
let index = -1;

const boards = [];

reader.on('line', line => {
	if (firstLine) {
		numbers = line.split(',');
		firstLine = false;
	} else {
		if (line === '' ) {
			boards.push(new Board());
			index++;
		} else {
			boards[index].addRow(line.split(' ').filter(number => number !== '').map(number => new Space(number)));
		}
	}
});

reader.on('close', () => {
	numbers.forEach(number => {
		boards.forEach((board) => {
			board.markBoard(number);
			if (board.won() && firstwin) {
				firstwin = false;
				console.log(board.score(number));
			}
		})
	});
});