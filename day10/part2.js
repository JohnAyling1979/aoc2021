const fileReader = require('../filereader')('input.txt');

const incompleLines = [];
const startCharacters = ['{', '(', '[', '<'];
const pairStart = {
	')': '(',
	']': '[',
	'}': '{',
	'>': '<',
}
const pairEnd = {
	'(': ')',
	'[': ']',
	'{': '}',
	'<': '>',
}
const characterScore = {
	'(': 1,
	'[': 2,
	'{': 3,
	'<': 4
};
const scores = [];

fileReader.on('line', input => {
	const stack = [];
	let corrupted = false

	const splitInput = input.split('');

	splitInput.forEach(character => {
		if (startCharacters.includes(character)) {
			stack.push(character);
		} else {
			const startCharacter = stack.pop();
			if (!corrupted && startCharacter !== pairStart[character]) {
				corrupted = true;
			}
		}
	});

	if (!corrupted) {
		incompleLines.push(splitInput);
	}
});

fileReader.on('close', () => {
	incompleLines.forEach(line => {
		const stack = [];
		let score = 0;

		line.forEach(character => {
			if (startCharacters.includes(character)) {
				stack.push(character);
			} else {
				stack.pop();
			}
		});

		for (i = stack.length - 1; i >= 0; i--) {
			score = 5 * score + characterScore[stack[i]];
		};

		scores.push(score);
	});

	scores.sort((a, b) => b - a);

	console.log(scores[(scores.length - 1) / 2]);
});