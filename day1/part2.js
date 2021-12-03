const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
	input: fs.createReadStream('input.txt'),
	console: false
});

const depths = [];
const countIncreasements = (depths, index, previous, count) => {
	if (index > depths.length - 3) {
		return count;
	}

	const current = depths.slice(index, index + 3).reduce((sum, depth) => sum + depth);

	if (previous !== -1 && current > previous) {
		count++;
	}

	return countIncreasements(depths, index + 1, current, count);
}

reader.on('line', line => {
	const depth = parseInt(line);

	depths.push(depth);
});

reader.on('close', () => {
	console.log(countIncreasements(depths, 0, -1, 0));
});
