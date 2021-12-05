const fileReader = require('../filereader')('input.txt');

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

fileReader.on('line', line => {
	const depth = parseInt(line);

	depths.push(depth);
});

fileReader.on('close', () => {
	console.log(countIncreasements(depths, 0, -1, 0));
});
