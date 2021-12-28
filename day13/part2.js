const fileReader = require('../filereader')('input.txt');

let dots = [];
const folds = [];
let enterDots = true;

for (let i = 0; i < 1300; i++) {
	const row = [];

	for (let i = 0; i < 1300; i++) {
		row.push('.');
	}

	dots.push(row);
}

fileReader.on('line', input => {
	if (input === '') {
		enterDots = false;
	} else {
		if (enterDots) {
			const position = input.split(',').map(number => parseInt(number));

			dots[position[1]][position[0]] = '#';
		} else {
			folds.push(input);
		}
	}
});

fileReader.on('close', () => {
	folds.forEach(fold => {
		const instructions = fold.split(' ');
		const foldInfo = instructions[2].split('=');

		foldDots(foldInfo[0], parseInt(foldInfo[1]));
	});

	dots.forEach(row => {
		console.log(row.join(''));
	})
});

const foldDots = (letter, value) => {
	switch (letter) {
		case 'y':
			for (let i = value + 1; i < dots.length; i++) {
				const row = value - (i - value)

				if (row < 0) {
					continue;
				}

				for (let j = 0; j < dots[row].length; j++) {
					if (dots[row][j] === '#' || dots[i][j] === '#') {
						dots[row][j] = '#';
					}
				};
			}

			dots = dots.splice(0, value);
			break;
		case 'x':
			for (let i = 0; i < dots.length; i++) {
				for (let j = value + 1; j < dots[i].length; j++) {
					const position = value - (j - value);
					if (position < 0) {
						continue;
					}

					if (dots[i][position] === '#' || dots[i][j] === '#') {
						dots[i][position] = '#';
					}
				}

				dots[i] = dots[i].splice(0, value);
			}
			break;
	}
}