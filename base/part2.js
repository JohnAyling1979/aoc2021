const fileReader = require('../filereader')('test.txt');

fileReader.on('line', input => {
});

fileReader.on('close', () => {
});