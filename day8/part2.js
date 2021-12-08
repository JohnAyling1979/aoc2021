const fileReader = require('../filereader')('input.txt');

let total = 0;

fileReader.on('line', input => {
	const mapOptions = {
		0: [],
		1: [],
		2: [],
		3: [],
		4: [],
		5: [],
		6: [],
		7: [],
		8: [],
		9: [],
	}

	const codeMap = {}

	const sections = input.split('|').map(section => section.trim());
	const hints = sections[0].split(' ').map(number => number.trim());

	hints.forEach(hint => {
		mapOptions[hint.length].push(hint.split('').sort());
	});

	const six = mapOptions[6].filter(letters => !(letters.includes(mapOptions[2][0][0]) && letters.includes(mapOptions[2][0][1])))[0].join('');
	mapOptions[6] = mapOptions[6].filter(letters => letters.join('') !== six);
	const zero = mapOptions[6].filter(letters => !(
		letters.includes(mapOptions[4][0][0]) &&
		letters.includes(mapOptions[4][0][1]) &&
		letters.includes(mapOptions[4][0][2]) &&
		letters.includes(mapOptions[4][0][3])
	))[0].join('');
	const nine = mapOptions[6].filter(letters => letters.join('') !== zero)[0].join('');

	const three = mapOptions[5].filter(letters => letters.includes(mapOptions[2][0][0]) && letters.includes(mapOptions[2][0][1]))[0].join('');
	mapOptions[5] = mapOptions[5].filter(letters => letters.join('') !== three);
	const five = mapOptions[5].filter(letters => {
		let count = 0;

		mapOptions[4][0].forEach(letter => {
			if (letters.includes(letter)) {
				count++;
			}
		});

		return count === 3;
	})[0].join('');
	const two = mapOptions[5].filter(letters => letters.join('') !== five)[0].join('');

	codeMap[zero] = '0';
	codeMap[mapOptions[2][0].join('')] = '1';
	codeMap[two] = '2';
	codeMap[three] = '3';
	codeMap[mapOptions[4][0].join('')] = '4';
	codeMap[five] = '5';
	codeMap[six] = '6';
	codeMap[mapOptions[3][0].join('')] = '7';
	codeMap[mapOptions[7][0].join('')] = '8';
	codeMap[nine] = '9';

	const number = sections[1].split(' ').map(number => codeMap[number.trim().split('').sort().join('')]).join('');

	total += parseInt(number);
});

fileReader.on('close', () => {
	console.log(total);
});