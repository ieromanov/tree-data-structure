import Tree from '../src'
import Node from '../src/Node'

describe('Tree', () => {
	let tree;

	beforeEach(() => {
		tree = new Tree({
			name: 'root',
			children: [
				{
					id: 224400,
					name: 'child111',
					children: ['data']
				},
				{
					id: 224411,
					name: 'child111',
					children: ['data']
				},
				{
					id: 224422,
					name: 'child112',
					children: ['data']
				},
				{
					id: 224433,
					name: 'child222',
					key: 224411
				}
			]
		})
	})

	describe('MAIN', () => {
		test('create Tree', () => {
			expect(tree).toBeInstanceOf(Tree)
		})
		
		test('should add node to root', () => {
			tree.add('first', tree.root)
			expect(tree.root.children[0].id).toBe(224400)
		})
		
		test('should return new Node after add to tree', () => {
			const node = tree.add('first', tree.root)
			expect(node).toBeInstanceOf(Node)
		})
		
		test('should parse tree', () => {
			expect(tree.root.children[0].name).toBe('child111')
			expect(tree.root.children[2].name).toBe('child112')
		})

		test('should remove node into tree', () => {	
			expect(tree.root.children[0].children.length).toBe(1)
			tree.remove(tree.root.children[0].children[0])
			expect(tree.root.children[0].children.length).toBe(0)
		})
		
		test('should search node(s) by data', () => {	
			const [node, node2] = tree.search('child111', 'name')
			expect(node.id).toEqual(224400)
			expect(node2.id).toEqual(224411)
		})
		
		test('should the node belongs to the tree', () => {
			const node = tree.root.children[0]
			expect(tree.belongs(node)).toBeTruthy()
		})
		
		test('should caching search data', () => {	
			const [node] = tree.search('child222', 'name')
			expect(tree.$_cache.values().next().value).toEqual(node)
		})
		
		test('should search by default "id" property', () => {	
			const [node] = tree.search(224422)
			expect(node.name).toEqual('child112')
			const [node2] = tree.search(224411)
			expect(node2.name).toEqual('child111')
		})
		
		test('should search some node by default "id" property', () => {	
			const [node, node2, node3] = tree.search([224411, 224422, 224433])
			expect(node.name).toEqual('child111')
			expect(node2.name).toEqual('child112')
			expect(node3.name).toEqual('child222')
		})
		
		test('should throw error if search data not having a type string, number or array', () => {
			expect(() => { tree.search({}) }).toThrow()
		})
	})

	describe('GETTERS & SETTERS', () => {
		test('should set data to root node in tree', () => {
			tree.root = 'root'
			expect(tree.root).toBeInstanceOf(Node)
			expect(tree.root.data).toBe('root')
		})
	})
})

