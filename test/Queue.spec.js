import Queue from '../src/Queue'

test('should create Queue', () => {
	const queue = new Queue()
	expect(queue).toBeInstanceOf(Queue)
})

test('should add element to Queue', () => {
	const queue = new Queue()
	queue.enqueue(1)
	queue.enqueue(2)
	queue.enqueue(3)
	expect(queue.queue.length).toEqual(3)
})

test('should remove element into Queue', () => {
	const queue = new Queue()
	queue.enqueue(1)
	queue.enqueue(2)
	expect(queue.queue.length).toEqual(2)
	queue.dequeue()
	expect(queue.queue.length).toEqual(1)
	queue.dequeue()
	expect(queue.queue.length).toEqual(0)
})

test('should dequeue return FIRST element in queue', () => {
	const queue = new Queue()
	for (let i = 0; i < 10; i++) {
		queue.enqueue(i)
	}
	for (let i = 0; i < 10; i++) {
		expect(queue.dequeue()).toEqual(i)
	}
})

test('should dequeue return LAST element in queue', () => {
	const queue = new Queue()
	for (let i = 0; i < 10; i++) {
		queue.enqueue(i)
	}
	for (let i = 0; i < 10; i++) {
		expect(queue.dequeue(true)).toEqual(9 - i)
	}
})
