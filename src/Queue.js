
class Queue {
	constructor() {
		this.queue = []
	}
	enqueue(element) {
		this.queue.push(element)
	}
	dequeue(reverse) {
		return reverse ? this.queue.pop() : this.queue.shift()
	}
}

export default Queue