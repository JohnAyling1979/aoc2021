const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
	input: fs.createReadStream('input.txt'),
	console: false
});

let horizontal = 0;
let depth = 0;

reader.on('line', line => {
	const command = line.split(' ');
	command[1] = parseInt(command[1]);

	switch (command[0]) {
		case 'forward':
			horizontal += command[1];
		break
		case 'down':
			depth += command[1];
		break
		case 'up':
			depth -= command[1];
		break
	}
});

reader.on('close', () => {
	console.log(horizontal * depth);
});
