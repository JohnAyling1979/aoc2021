const fileReader = require('../filereader')('input.txt');

const ones = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const zeros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

fileReader.on('line', line => {
	const digits = line.split('');

	digits.forEach((digit, index) => {
		if (digit === '1') {
			ones[index]++;
		} else {
			zeros[index]++;
		}
	});
});

fileReader.on('close', () => {
	let gamma = '';
	let epsilon = '';

	for (index = 0; index < 12; index++) {
		if (ones[index] > zeros[index]) {
			gamma += '1';
			epsilon += '0';
		} else {
			gamma += '0';
			epsilon += '1';
		}
	}

	console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
})