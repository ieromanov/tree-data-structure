import Tree from '../src'
import Node from '../src/Node'

test('create Tree', () => {
	const tree = new Tree()
	expect(tree).toBeInstanceOf(Tree)
})

test('should add node to root', () => {
	const tree = new Tree('root')
	tree.add('first', tree.root)
	expect(tree.root.children[0].data).toBe('first')
})

test('should return new Node after add to tree', () => {
	const tree = new Tree('root')
	const node = tree.add('first', tree.root)
	expect(node).toBeInstanceOf(Node)
})

test('should parse tree', () => {
	const tree = new Tree({
		name: 'root',
		children: [
			{
				name: 'child',
				children: ['data']
			},
			{
				name: 'child2'
			}
		]
	})
	expect(tree.root.children[0].name).toBe('child')
	expect(tree.root.children[1].name).toBe('child2')
	expect(tree.root.children[0].children[0].data).toBe('data')
})

test('should set data to root node in tree', () => {
	const tree = new Tree()
	tree.root = 'root'

	expect(tree.root).toBeInstanceOf(Node)
	expect(tree.root.data).toBe('root')
})

test('should remove node into tree', () => {
	const tree = new Tree({
		name: 'root',
		children: [
			{
				name: 'child',
				children: ['data']
			},
			{
				name: 'child2'
			}
		]
	})

	expect(tree.root.children[0].children.length).toBe(1)
	tree.remove(tree.root.children[0].children[0])
	expect(tree.root.children[0].children.length).toBe(0)
})

test('should search node(s) by data', () => {
	const tree = new Tree({
		name: 'root',
		children: [
			{
				name: 'child',
				children: ['data']
			},
			{
				name: 'child2',
				key: 224411,
				children: [
					{
						name: 'child2',
						key: 1933
					}
				]
			}
		]
	})

	const [ node, node2 ] = tree.search('child2', 'name')
	expect(node.key).toEqual(1933)
	expect(node2.key).toEqual(224411)
})

test('should the node belongs to the tree', () => {
	const tree = new Tree({
		name: 'root',
		children: [
			{
				name: 'child',
				children: ['data']
			},
			{
				name: 'child2',
				key: 224411
			}
		]
	})

	const [ node ] = tree.search('child2', 'name')
	expect(tree.belongs(node)).toBeTruthy()
})

test('should caching search data', () => {
	const tree = new Tree({
		name: 'root',
		children: [
			{
				name: 'child',
				children: ['data']
			},
			{
				name: 'child2',
				key: 224411
			}
		]
	})

	const [ node ] = tree.search('child2', 'name')
	expect(tree.$_cache['child2']).toEqual(node)
})

test('should search by default "id" property', () => {
	const tree = new Tree({
		name: 'root',
		children: [
			{
				id: 224411,
				name: 'child111',
				children: ['data']
			},
			{
				id: 224422,
				name: 'child222',
				key: 224411
			}
		]
	})

	const [ node ] = tree.search(224422)
	expect(node.name).toEqual('child222')
	const [ node2 ] = tree.search(224411)
	expect(node2.name).toEqual('child111')
})
