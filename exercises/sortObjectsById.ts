const data = [
	{ id: 2, name: 'Петя' },
	{ id: 1, name: 'Вася' },
	{ id: 3, name: 'Надя' },
];

function sortObjectsById<T extends { id: number }>(data: Array<T>, option: 'asc' | 'desc' = 'asc'): Array<T> {
	if (option === 'asc') {
		return data.sort((a, b) => a.id - b.id);
	} else {
		return data.sort((a, b) => b.id - a.id);
	}
}
console.log(sortObjectsById(data));
console.log(sortObjectsById(data, 'desc'));
