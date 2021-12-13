const fileReader = require('../filereader')('input.txt');

const startCharacters = ['{', '(', '[', '<'];
const pair = {
	')': '(',
	']': '[',
	'}': '{',
	'>': '<',
}
const score = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137
};
let totalScore = 0;

fileReader.on('line', input => {
	const stack = [];
	let corrupted = false

	const splitInput = input.split('');

	splitInput.forEach(character => {
		if (startCharacters.includes(character)) {
			stack.push(character);
		} else {
			const startCharacter = stack.pop();
			if (!corrupted && startCharacter !== pair[character]) {
				totalScore += score[character];
				corrupted = true;
			}
		}
	})

});

fileReader.on('close', () => {
	console.log(totalScore);
});