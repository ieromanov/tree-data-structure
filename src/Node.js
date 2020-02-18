import { isArray, isObject, isFunction, uuid } from './helpers'
import { DEFAULT_TRACK_KEY } from './constants'

/**
 * @constructor
 * @param { any } data - Данные, которые будет хранить узел. Могут быть любым типом.
 * Если обект, то развернет свойства внутри себя, остальные типы хранятся в поле data
 * @param { string | number } id - идентификатор узла
 * @param { string | number } treeId - идентификатор дерева, в котором находится узел
 * @param { string | number } parent - ссылка на родительский узел
 */
export default class Node {
	constructor(data, options = {}) {
		if (options.parent !== undefined && !(options.parent instanceof Node)) {
			throw new Error('Parent arg not instance of \'Node\'')
		}

		const { treeId, parent, trackFieldName } = options

		const trackKey = trackFieldName !== undefined
			? trackFieldName
			: DEFAULT_TRACK_KEY
		const trackValue = isObject(data) && data[trackFieldName] !== undefined
			? data[trackFieldName]
			: uuid.create()

		this.$_options = {
			trackFieldName: trackKey
		}

		this[trackKey] = trackValue
		this.$_treeId = treeId
		this.$_parentId =  parent
			? parent[trackKey]
			: null
		this.$_path = parent
			? [...parent.$_path, parent[trackKey]]
			: []
		this.$_children = []
		this.$_uuidGenerator = uuid.create

		this.$initData(data)

		this.add = this.add.bind(this)
		this.remove = this.remove.bind(this)
		this.belongs = this.belongs.bind(this)
	}

	get children () {
		return this.$_children
	}
	get hasChild() {
		return (this.$_children && isArray(this.$_children) && this.$_children.length > 0)
	}
	get isRoot() {
		return this.$_parentId === null
	}
	get level() { // На каком уровне вложенности находится узел
		return this.$_path.length + 1
	}

	get toObject() {
		let obj = {}
		for (let property in this) {
			if (!property.includes('$') && !isFunction(this[property])) {
				obj[property] = this[property]
			}
		}
		return obj
	}

	set parent(parent) {
		if (!(parent instanceof Node)) {
			throw new Error('Parent must be only Node')
		}
		this.$_parentId = parent[this.$_options.trackFieldName]
		parent.add(this)
		this.$_path = [ ...parent.$_path, parent[this.$_options.trackFieldName] ]
	}

	// Если в data пришел объект, переписать его свойства в this
	$initData(data) {
		if(isObject(data)) {
			for (let property in data) {
				if (property !== 'children') {
					this[property] = data[property]
				}
			}
		} else {
			this.data = data
		}
	}

	// Добавляет элемент типа Node в дочерние элементы
	add(data) {
		if (isArray(data)) {
			if (data[0] instanceof Node) {
				this.$_children.push(...data)
			} else {
				for(let i = 0, length = data.length; i < length; i++) {
					this.$_children.push(new Node(data[i], {
						treeId: this.$_treeId,
						parent: this
					}))
				}
			}
		} else {
			this.$_children.push(
				data instanceof Node
					? data
					: new Node(data, {
						treeId: this.$_treeId,
						parent: this
					})
			)
		}

		return data
	}
	// Удаляет дочерний элемент
	remove(nodeToRemove) {
		if (nodeToRemove === undefined) {
			throw new Error('First argument required. You should pass Node which you want to delete')
		} 
		this.$_children = this.$_children.filter(child => child[this.$_options.trackFieldName] !== nodeToRemove[this.$_options.trackFieldName])
	}

	// Является ли переданный узел дочерним данному узлу
	belongs(node) {
		return node instanceof Node && this.$_children.some(child => child[this.$_options.trackFieldName] === node[this.$_options.trackFieldName])
	}
}