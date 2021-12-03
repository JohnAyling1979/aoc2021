const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
	input: fs.createReadStream('input.txt'),
	console: false
});

let horizontal = 0;
let depth = 0;
let aim = 0;

reader.on('line', line => {
	const command = line.split(' ');
	command[1] = parseInt(command[1]);

	switch (command[0]) {
		case 'forward':
			horizontal += command[1];
			depth += command[1] * aim;
		break
		case 'down':
			aim += command[1];
		break
		case 'up':
			aim -= command[1];
		break
	}
});

reader.on('close', () => {
	console.log(horizontal * depth);
});
