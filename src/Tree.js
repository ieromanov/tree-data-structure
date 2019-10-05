import { isArray, isObject, UUID } from './helpers'
import Node from './Node'
import Queue from './Queue'

const uuid = new UUID()

/**
 * @constructor
 * @param { object } data - Данные
 * @param { function } guidGenerator - Функция которая возвращает guid
 */
export class Tree {
	constructor(data, guidGenerator) {
		this.$_guidGenerator = guidGenerator || uuid.create
		this.$_treeId = this.$_guidGenerator()
		this.$_root = data ? new Node(data, this.$_guidGenerator(), this.$_treeId) : null
	}

	get root() {
		return this.$_root
	}

	set root(data) {
		this.$_root = new Node(data, this.$_guidGenerator(), this.$_treeId)
	}

	get treeId() {
		return this.$_treeId
	}

	// Поиск в глубину по дереву
	_depthSearch(callback) {
		(function recursion(currentNode) {
			for (var i = 0, length = currentNode.children.length; i < length; i++) {
				recursion(currentNode.children[i]);
			}

			callback(currentNode);
		})(this.$_root);
	}

	// Поиск в ширину по дереву
	_breadthSearch(next) {
		const queue = new Queue();
	
		queue.enqueue(this.$_root);
		let currentTree = queue.dequeue();
	
		while(next(currentTree)){
			for (let i = 0, length = currentTree.children.length; i < length; i++) {
				queue.enqueue(currentTree.children[i]);
			}
			currentTree = queue.dequeue();
		}
	}

	_selectTraverseMethod(traversal) {
		switch (traversal.toLowerCase()) {
			case 'bf':
				return this._breadthSearch
			case 'df':
				return this._depthSearch
			default:
				throw new Error('Unknown traversal method');
				return null
		}
	}

	_applyToNode(callback, traversal) {
		traversal.call(this, callback);
	};

	_parse(data) {

	}

	add(data, parent, addAllByOne = false) {
		if (!parent) throw new Error('parent(second argument) require argument')

		if (addAllByOne) {
			if (!isArray(data)) throw new Error('To add multiple items one at a "data" argument must be an array')
			const children = data.map((nodeData) => new Node(nodeData, this.$_guidGenerator(), this.$_treeId, parent))
			parent.add(children);
			return children
		} else {
			parent.add(new Node(data, this.$_guidGenerator(), this.$_treeId, parent));
			return child
		}
	}

	remove(nodeToRemove) {
		if (nodeToRemove) {
			nodeToRemove.remove()
		} else {
			throw new Error('Parent does not exist.');
		}
	}

	belongs(node) {
		return node instanceof Node && this.$_treeId === node.$_treeId // ToDo: добавить поиск по дереву для проверки
	}
}