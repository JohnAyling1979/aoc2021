const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
	input: fs.createReadStream('input.txt'),
	console: false
});

const numbers = [];

reader.on('line', line => {
	const digits = line.split('');

	numbers.push(digits);
});

reader.on('close', () => {
	let oxygen = numbers;
	let co2 = numbers;
	let index = 0;

	while (oxygen.length > 1) {
		let ones = 0;
		let zeros = 0;

		oxygen.forEach(digits => {
			if (digits[index] === '1') {
				ones++;
			} else {
				zeros++;
			}
		});

		if (ones >= zeros) {
			oxygen = oxygen.filter((digits) => digits[index] === '1')
		} else {
			oxygen = oxygen.filter((digits) => digits[index] === '0')
		}

		index++;
	}

	index = 0;

	while (co2.length > 1) {
		let ones = 0;
		let zeros = 0;

		co2.forEach(digits => {
			if (digits[index] === '1') {
				ones++;
			} else {
				zeros++;
			}
		});

		if (zeros > ones) {
			co2 = co2.filter((digits) => digits[index] === '1')
		} else {
			co2 = co2.filter((digits) => digits[index] === '0')
		}

		index++;
	}

	console.log(parseInt(oxygen[0].join(''), 2) * parseInt(co2[0].join(''), 2));
})