const fileReader = require('../filereader')('input.txt');

let count = 0;

fileReader.on('line', input => {
	const sections = input.split('|').map(section => section.trim());

	const numbers = sections[1].split(' ').map(number => number.trim());

	numbers.forEach(number => {
		if (number.length === 2 || number.length == 4 || number.length === 3 || number.length === 7) {
			count++;
		}
	});
});

fileReader.on('close', () => {
	console.log(count);
});