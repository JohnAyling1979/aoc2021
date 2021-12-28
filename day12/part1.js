const fileReader = require('../filereader')('input.txt');

let paths = 0;
const graph = {}
class Node {
	constructor(name, big) {
		this.name = name;
		this.big = big;
		this.connections = [];
	}

	addConnections(node) {
		this.connections.push(node)
	}

	visit(visited) {
		if (visited.includes(this.name)) {
			return;
		}

		if (this.name === 'end') {
			paths++;
			return;
		}

		if (!this.big) {
			visited.push(this.name);
		}

		this.next([...visited]);
	}

	next(visited) {
		this.connections.forEach(node => {
			node.visit([...visited]);
		})
	}
}

function isBig(name) {
	return name === name.toUpperCase();
}

fileReader.on('line', input => {
	const points = input.split('-');

	if (graph[points[0]] === undefined) {
		graph[points[0]] = new Node(points[0], isBig(points[0]))
	}

	if (graph[points[1]] === undefined) {
		graph[points[1]] = new Node(points[1], isBig(points[1]))
	}

	graph[points[0]].addConnections(graph[points[1]]);
	graph[points[1]].addConnections(graph[points[0]]);
});

fileReader.on('close', () => {
	graph['start'].visit([]);
	console.log(paths);
});