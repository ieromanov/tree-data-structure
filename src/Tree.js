import {
	isArray,
	isObject,
	isNumber,
	isString,
	uuid,
	generateKey
} from './helpers'
import Node from './Node'
import Queue from './Queue'

import { DEFAULT_TRACK_KEY } from './constants'

/**
 * @constructor
 * @param { object } data - Данные
 * @param { function } guidGenerator - Функция которая возвращает guid
 */
export class Tree {
	constructor(data, options = {}) {
		this.$_treeId = uuid.create()
		this.$_cache = new Map()
		this.$_options = {
			trackFieldName: options.trackFieldName !== undefined
				? options.trackFieldName
				: DEFAULT_TRACK_KEY
		}

		this.$_root = data ? new Node(data, this.$_treeId) : null
		if (isObject(data)) {
			this._parse(data, this.$_root)
		}
	}

	get root() {
		return this.$_root
	}

	set root(data) {
		this.$_root = new Node(data, {
			...this.$_options,
			treeId: this.$_treeId
		})
	}

	get treeId() {
		return this.$_treeId
	}

	/**
	 * Поиск в глубину по дереву
	 * @param { function } next - функция 
	 * @param { Node } data - дерево, по которому нужно искать
	 * @param { boolean } reverse - искать в обратном порядке
	 */
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

	/**
	 * Поиск в ширину по дереву
	 * @param { function } next - функция 
	 * @param { Node } data - дерево, по которому нужно искать
	 * @param { boolean } reverse - искать в обратном порядке
	 */
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

	/**
	 * 
	 * @param { string } traversal - как искать по дереву, в ширину или глубину. bf или df
	 */
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

	/**
	 * 
	 * @param { string } traversal - выбор поиска, в ширину или глубину
	 * @param { function } next - функция, принимающая Node и возвращающая boolean(продалжать поиск или нет)
	 * @param  { ...any } args 
	 */
	_applyToNode(traversal, next, ...args) {
		this._selectTraverseMethod(traversal).call(this, next, ...args);
	};

	/**
	 * 
	 * @param { object } data - древовидная структура, дочерние элементы в свойстве children
	 * @param { Node } parent - узел, куда будет достраиваться дерево
	 */
	_parse(data, parent) {
		if (isArray(data.children)) {
			data.children.forEach(child => {
				const childNode = parent.add(new Node(child, {
					...this.$_options,
					treeId: this.$_treeId,
					parent
				}))
				this._parse(child, childNode)
			})
		}
	}

	/**
	 * 
	 * @param { any } data - данные, которые нужно добавить
	 * @param { Node } parent - ссылка на элемент в который нужно добавить 
	 * @param { boolean } addAllByOne - добавить массив элементов, как дочерние элементы по одному
	 */
	add(data, parent, addAllByOne = false) {
		if (!parent) throw new Error('parent(second argument) require argument')

		if (addAllByOne) {
			if (!isArray(data)) {
				throw new Error('To add multiple items one at a "data" argument must be an array')
			}
			const children = data.map((nodeData) => new Node(nodeData, {
				...this.$_options,
				treeId: this.$_treeId,
				parent
			}))
			parent.add(children);
			return children
		} else {
			const child = new Node(data, {
				...this.$_options,
				treeId: this.$_treeId,
				parent
			})
			parent.add(child);
			return child
		}
	}

	/**
	 * 
	 * @param { Node } nodeToRemove - ссылка на элемент, который нужно удалить
	 */
	remove(nodeToRemove) {
		if (nodeToRemove) {
			const parent = this.search(
				nodeToRemove.$_parentId,
				this.$_options.trackFieldName,
				true,
				true
			)
			if (parent[0] !== undefined) {
				parent[0].remove(nodeToRemove)
			}
		} else {
			throw new Error('first argument required');
		}
	}

	/**
	 * 
	 * @param { string | number } data 
	 * @param { string } key 
	 * @param { boolean } isDeepSearch 
	 * @param { boolean } onlyFirst 
	 */
	search(data, { key = 'id', isDeepSearch = true, onlyFirst = false }) {
		const searchArrayData = isArray(data)
		if (!isNumber(data) && !isString(data) && !searchArrayData) {
			throw new Error('search only by data with type string, number or Array<number>, Array<string>')
		}
		const keyForCache = generateKey(data, key)
		if (this.$_cache.has(keyForCache) && onlyFirst) {
			return this.$_cache.get(keyForCache)
		}
		let searchedNode = []
		const next = node => {
			const isCurrentData = searchArrayData
				? data.includes(node[key])
				: node[key] === data

			if (isCurrentData) {
				searchedNode.push(node)
				this.$_cache.set(keyForCache, node)
				return !onlyFirst
			}
			return true
		}
		this._applyToNode(isDeepSearch ? 'df' : 'bf', next, this.root)
		return searchedNode
	}

	/**
	 * 
	 * @param { Node } node - проверка, принадлизит ли переданный узел дереву
	 */
	belongs(node) {
		return node instanceof Node && this.$_treeId === node.$_treeId
	}
}