const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
	input: fs.createReadStream('input.txt'),
	console: false
});

let count = 0;
let previous = -1;

reader.on('line', line => {
	const depth = parseInt(line);

	if (depth > previous && previous !== -1) {
		count ++;
	}

	previous = depth;
});

reader.on('close', () => {
	console.log(count);
});
