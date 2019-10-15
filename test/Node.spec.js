import Node from '../src/Node'

test('should create Node', () => {
	const node = new Node()
	expect(node).toBeInstanceOf(Node)
})

test('should throw error if parent not instance of Node', () => {
	const parent = new Node('root', 111, 222)
	expect(() => {
		new Node('child', 333, 222, {})
	}).toThrow()
})
