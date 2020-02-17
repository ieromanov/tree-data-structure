import Node from '../src/Node'

describe('Node', () => {
	let node;
	let parent;

	beforeEach(() => {
		node = new Node('node', 'id', 'tree-id')
		parent = new Node('parent', 'parent-id')
	})

	test('should create Node', () => {
		expect(node).toBeInstanceOf(Node)
	})
	
	test('should throw error if parent not instance of Node', () => {
		expect(() => {
			new Node('child', 333, 222, {})
		}).toThrow()
	})
	
	test('should add data to Node children', () => {
		node.add('children number one')
		expect(node.children.length).toEqual(1)
	
		node.add('children number one')
		expect(node.children.length).toEqual(2)
	})
	
	test('should add Array data to Node children', () => {
		parent.add([ 1, 2, 'test' ])
	
		expect(parent.children.length).toEqual(3)
		expect(parent.children[0].data).toEqual(1)
		expect(parent.children[1].data).toEqual(2)
		expect(parent.children[2].data).toEqual('test')
	})
	
	test('should add Array Nodes to Node children', () => {
		const firstChild = new Node('first', 200)
		const secondChild = new Node('second', 300)
		parent.add([ firstChild, secondChild ])
	
		expect(parent.children.length).toEqual(2)
		expect(parent.children[0]).toEqual(firstChild)
		expect(parent.children[1]).toEqual(secondChild)
	})
	
	test('should throw Error if not pass Node to remove', () => {
			parent.add('children number one')
		expect(parent.children.length).toEqual(1)
	
		expect(() => {
			parent.children[0].remove()
		}).toThrow()
	})
	
	test('should throw Error if remove node without parent node', () => {
		expect(() => node.remove()).toThrow()
	})
	
	test('should child Node belongs parent Node', () => {
		parent.add('children number one')
		expect(parent.belongs(parent.children[0])).toBeTruthy()
	})
	
	// Getters
	test('should getter hasChild return right value', () => {
		expect(parent.hasChild).toBeFalsy()
		parent.add('child')
		expect(parent.hasChild).toBeTruthy()
	})
	
	test('should getter isRoot return right value', () => {
		parent.add('child')
		expect(parent.children[0].isRoot).toBeFalsy()
		expect(parent.isRoot).toBeTruthy()
	})
	
	test('should getter level return right value', () => {
		parent.add('first-child')
		const firstChildren = parent.children[0]
		firstChildren.add('second-child')
		const secondChildren = firstChildren.children[0]
	
		expect(parent.level).toEqual(1)
		expect(firstChildren.level).toEqual(2)
		expect(secondChildren.level).toEqual(3)
	})
	
	test('should setter parent add link on parent Node', () => {
		node.parent = parent
	
		expect(node.$_parentId).toEqual(parent.$_id)
		expect(parent.children.length).toEqual(1)
		expect(parent.belongs(node)).toBeTruthy()
		expect(node.$_parentIds[node.$_parentIds.length - 1]).toEqual(parent.$_id)
	})
	
	test('should setter parent throw error if parent not instance of Node', () => {
		const obj = {}
		
		expect(() => {
			node.parent = obj
		}).toThrow('Parent must be only Node')
	})
	
	test('should toObject getter return Object data', () => {
		const n = new Node({ id: 123, name: 'root', someProp: 12 }, 1)
		expect(n.toObject).toEqual({ id: 123, name: 'root', someProp: 12 })
	})
})
