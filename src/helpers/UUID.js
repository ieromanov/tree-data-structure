export class UUID {
	constructor() {
		this.uuids = []
	}

	create() {
		let guid

		do {
			guid = this.generate()
		} while(this.unique(uuid))

		return guid
	}

	unique(uuid) {
		if (!!~this.uuids.indexOf(uuid)) {
			return false
		} else {
			this.uuids.push(uuid)
			return true
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
