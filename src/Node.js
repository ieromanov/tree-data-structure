import { isArray, isObject, isFunction, uuid } from './helpers'

/**
 * @constructor
 * @param { any } data - Данные, которые будет хранить узел. Могут быть любым типом.
 * Если обект, то развернет свойства внутри себя, остальные типы хранятся в поле data
 * @param { string | number } id - идентификатор узла
 * @param { string | number } treeId - идентификатор дерева, в котором находится узел
 * @param { string | number } parent - ссылка на родительский узел
 */
export default class Node {
	constructor(data, id, treeId, parent) {
		if (parent && !(parent instanceof Node)) throw new Error('Parent arg not instance of \'Node\'')
		this.$_id = id
		this.$_treeId = treeId
		this.$_parent = parent || null
		this.$_pathIds = parent ? [ ...parent.$_pathIds, parent.$_id ] : []
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
		return this.$_parent === null
	}
	get level() { // На каком уровне вложенности находится узел
		return this.$_pathIds.length + 1
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
		if (!(parent instanceof Node)) throw new Error('Parent must be only Node')
		this.$_parent = parent
		parent.add(this)
		this.$_parentIds = [ ...parent.$_pathIds, parent.$_id ]
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
					this.$_children.push(new Node(data[i], this.$_uuidGenerator(), this.$_treeId, this))
				}
			}
		} else {
			this.$_children.push(
				data instanceof Node
					? data
					: new Node(data, this.$_uuidGenerator(), this.$_treeId, this)
			)
		}

		return data
	}
	// Удаляет сам себя из родительского массива
	remove() {
		if (this.$_parent) {
			this.$_parent.$_children = this.$_parent.$_children.filter(node => node.$_id !== this.$_id)
		} else {
			throw new Error('Node not has parent node')
		}
	}

	// Является ли переданный узел дочерним данному узлу
	belongs(node) {
		return node instanceof Node && this.$_children.some(child => child.$_id === node.$_id)
	}
}