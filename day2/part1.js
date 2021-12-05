const fileReader = require('../filereader')('input.txt');

let horizontal = 0;
let depth = 0;

fileReader.on('line', line => {
	const command = line.split(' ').map(command => isNaN(command) ? command : parseInt(command));

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

fileReader.on('close', () => {
	console.log(horizontal * depth);
});
