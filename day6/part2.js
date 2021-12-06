const fileReader = require('../filereader')('input.txt');

let fishes = {
	new: 0,
	0: 0,
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0,
	6: 0,
	7: 0,
	8: 0,
};

fileReader.on('line', line => {
	ages = line.split(',').map(days => parseInt(days));

	ages.forEach(age => {
			fishes[age]++;
	});
});

fileReader.on('close', () => {
	for(let x = 0; x < 256; x++) {
		fishes['new'] = fishes['0'];
		fishes['0'] = fishes['1'];
		fishes['1'] = fishes['2'];
		fishes['2'] = fishes['3'];
		fishes['3'] = fishes['4'];
		fishes['4'] = fishes['5'];
		fishes['5'] = fishes['6'];
		fishes['6'] = fishes['7'];
		fishes['7'] = fishes['8'];


		fishes['8'] = fishes['new'];
		fishes['6'] += fishes['new'];
		fishes['new'] = 0;
	}

	console.log(Object.values(fishes).reduce((sum, fish) => sum + fish, 0));
});