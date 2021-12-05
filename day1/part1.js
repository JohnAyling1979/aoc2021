const fileReader = require('../filereader')('input.txt');

let count = 0;
let previous = -1;

fileReader.on('line', line => {
	const depth = parseInt(line);

	if (depth > previous && previous !== -1) {
		count ++;
	}

	previous = depth;
});

fileReader.on('close', () => {
	console.log(count);
});
