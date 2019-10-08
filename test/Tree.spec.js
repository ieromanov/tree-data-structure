import Tree from '../src'

test('create Tree', () => {
	const tree = new Tree()
	expect(tree).toBeInstanceOf(Tree)
})