const fileReader = require('../filereader')('input.txt');

fileReader.on('line', line => {
	let lowest = null;
	const locations = line.split(',').map(location => parseInt(location)).sort();

	for (let target = locations[0]; target <= locations[locations.length -1]; target++) {
		const fuelUsed = locations.reduce((fuel, location) => fuel + Math.abs(location - target), 0);

		if (lowest === null || fuelUsed < lowest) {
			lowest = fuelUsed;
		}
	}

	console.log(lowest);
});
