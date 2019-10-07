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
		data && this._parse(data, this.$_root)
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
	_depthSearch(next, data, reverse) {
		const recursion = currentNode => {
			reverse && next(currentNode)

			if (currentNode.children) {
				for (var i = 0, length = currentNode.children.length; i < length; i++) {
					recursion(currentNode.children[i]);
				}
			}

			!reverse && next(currentNode);
		}
		recursion(data)
	}

	// Поиск в ширину по дереву
	_breadthSearch(next, data, reverse) {
		const queue = new Queue();
	
		queue.enqueue(data);
		let currentTree = queue.dequeue();
	
		while(currentTree && next(currentTree)){
			if (currentTree.children) {
				for (let i = 0, length = currentTree.children.length; i < length; i++) {
					queue.enqueue(currentTree.children[i]);
				}
			}

			currentTree = queue.dequeue(reverse);
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

	_applyToNode(traversal, next, ...args) {
		this._selectTraverseMethod(traversal).call(this, next, ...args);
	};

	_parse(data, parent) {
		data.children && data.children.forEach(child => {
			const childNode = parent.add(new Node(child, this.$_guidGenerator(), this.$_treeId, parent))
			this._parse(child, childNode)
		})
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
	
	getAllDataByKey(key) {
		const search = (key, data, result = []) => {
			try {
				Object.keys(data).forEach((prop) => {
					if(prop === key){
						result.push(data[prop]);
						return result;
					}
					if(typeof data[prop] === 'object'){
						search(key, data[prop], result);
					}
				});
				return result;
			} catch(error) {
				console.error(error)
			}
		};

		return search(key, this.$_root)
	}

	belongs(node) {
		return node instanceof Node && this.$_treeId === node.$_treeId // ToDo: добавить поиск по дереву для проверки
	}
}