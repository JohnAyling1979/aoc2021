const fileReader = require('../filereader')('input.txt');

class Fish {
	constructor(days = 8) {
		this.days = days;
	}

	decrease() {
		this.days--;

		if (this.days === -1) {
			fishes.push(new Fish);
			this.days = 6
		}
	}
}

let fishes = [];

fileReader.on('line', line => {
	fishes = line.split(',').map(days => new Fish(parseInt(days)));
});

fileReader.on('close', () => {
	for(let x = 0; x < 80; x++) {
		fishes.forEach(fish => fish.decrease());
	}

	console.log(fishes.length);
});