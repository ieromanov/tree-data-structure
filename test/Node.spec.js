import Node from '../src/Node'

test('should create Node', () => {
	const node = new Node()
	expect(node).toBeInstanceOf(Node)
})

test('should throw error if parent not instance of Node', () => {
	expect(() => {
		new Node('child', 333, 222, {})
	}).toThrow()
})

test('should add data to Node children', () => {
	const node = new Node('root', 100)

	node.add('children number one')
	expect(node.children.length).toEqual(1)

	node.add('children number one')
	expect(node.children.length).toEqual(2)
})

test('should add Array data to Node children', () => {
	const parent = new Node('root', 100)
	parent.add([ 1, 2, 'test' ])

	expect(parent.children.length).toEqual(3)
	expect(parent.children[0].data).toEqual(1)
	expect(parent.children[1].data).toEqual(2)
	expect(parent.children[2].data).toEqual('test')
})

test('should add Array Nodes to Node children', () => {
	const parent = new Node('root', 100)
	const firstChild = new Node('first', 200)
	const secondChild = new Node('second', 300)
	parent.add([ firstChild, secondChild ])

	expect(parent.children.length).toEqual(2)
	expect(parent.children[0]).toEqual(firstChild)
	expect(parent.children[1]).toEqual(secondChild)
})

test('should remove Node into parent Node', () => {
	const parent = new Node('root', 100)

	parent.add('children number one')
	expect(parent.children.length).toEqual(1)

	parent.children[0].remove()
	expect(parent.children.length).toEqual(0)
})

test('should throw Error if remove node without parent node', () => {
	const node = new Node('root', 100)

	expect(() => node.remove()).toThrow()
})

test('should child Node belongs parent Node', () => {
	const parent = new Node('root', 100)
	parent.add('children number one')
	const child = parent.children[0]

	expect(parent.belongs(child)).toBeTruthy()
})


// Getters
test('should getter hasChild return right value', () => {
	const parent = new Node('root', 100)

	expect(parent.hasChild).toBeFalsy()

	parent.add('child')
	expect(parent.hasChild).toBeTruthy()
})

test('should getter isRoot return right value', () => {
	const parent = new Node('root', 100)
	parent.add('child')

	expect(parent.children[0].isRoot).toBeFalsy()
	expect(parent.isRoot).toBeTruthy()
})

test('should getter level return right value', () => {
	const parent = new Node('root', 100)
	parent.add('first-child')
	const firstChildren = parent.children[0]
	firstChildren.add('second-child')
	const secondChildren = firstChildren.children[0]

	expect(parent.level).toEqual(1)
	expect(firstChildren.level).toEqual(2)
	expect(secondChildren.level).toEqual(3)
})

test('should setter parent add link on parent Node', () => {
	const node = new Node('root', 100)
	const parent = new Node('root', 100)
	node.parent = parent

	expect(node.$_parent).toEqual(parent)
	expect(parent.children.length).toEqual(1)
	expect(parent.belongs(node)).toBeTruthy()
	expect(node.$_parentIds[node.$_parentIds.length - 1]).toEqual(parent.$_id)
})

test('should setter parent throw error if parent not instance of Node', () => {
	const node = new Node('root', 100)
	const parent = {}
	
	expect(() => {
		node.parent = parent
	}).toThrow('Parent must be only Node')
})

test('should toObject getter return Object data', () => {
	const node = new Node({ id: 123, name: 'root', someProp: 12 }, 1)

	expect(node.toObject).toEqual({ id: 123, name: 'root', someProp: 12 })
})
