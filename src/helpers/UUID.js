export class UUID {
	constructor() {
		this.uuids = []

		this.create = this.create.bind(this)
		this.unique = this.unique.bind(this)
	}

	create() {
		let uuid

		do {
			uuid = this.generate()
		} while(this.unique(uuid))

		return uuid
	}

	unique(uuid) {
		if (!!~this.uuids.indexOf(uuid)) {
			return true
		} else {
			this.uuids.push(uuid)
			return false
		}
	}

	generate() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8
			return v.toString(16)
		})
	}
}
