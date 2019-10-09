import { UUID } from '../src/helpers'

test('should created UUID class', () => {
	const uuid = new UUID()
	expect(uuid).toBeInstanceOf(UUID)
})

test('should create uuid', () => {
	const uuid = new UUID().create()
	expect(typeof uuid).toBe('string')
	expect(uuid.length).toEqual(36)
})
