const fileReader = require('../filereader')('input.txt');

const factorial = number => {
	if (number < 1) {
		return number;
	}

	return number + factorial(number - 1);
}

fileReader.on('line', line => {
	let lowest = null;
	const locations = line.split(',').map(location => parseInt(location)).sort();

	for (let target = locations[0]; target <= locations[locations.length -1]; target++) {
		const fuelUsed = locations.reduce((fuel, location) => fuel + factorial(Math.abs(location - target)), 0);

		if (lowest === null || fuelUsed < lowest) {
			lowest = fuelUsed;
		}
	}

	console.log(lowest);
});
