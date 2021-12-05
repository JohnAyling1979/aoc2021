const fileReader = require('../filereader')('input.txt');

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
		this.finished = false;
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
		if (this.finished) {
			return false;
		}

		for (let index = 0; index < 5; index++) {
			if (this.spaces[index].filter(space => space.marked).length === 5) {
				this.finished = true;
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
				this.finished = true;
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
let numbers;
let index = -1;

const boards = [];

fileReader.on('line', line => {
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

fileReader.on('close', () => {
	numbers.forEach(number => {
		boards.forEach((board) => {
			board.markBoard(number);
			if (board.won()) {
				console.log(board.score(number));
			}
		})
	});
});