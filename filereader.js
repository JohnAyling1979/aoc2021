const fs = require('fs');
const readline = require('readline');

const fileReader = filename => {
	return readline.createInterface({
		input: fs.createReadStream(filename),
		console: false
	});
}

module.exports = fileReader;