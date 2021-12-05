const fileReader = require('../filereader')('input.txt');

let horizontal = 0;
let depth = 0;
let aim = 0;

fileReader.on('line', line => {
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

fileReader.on('close', () => {
	console.log(horizontal * depth);
});
