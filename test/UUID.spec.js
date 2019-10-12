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

test('should check uuid on unique', () => {
	const uuidCreator = new UUID()
	expect(uuidCreator.exist(1)).toBeFalsy()
	expect(uuidCreator.uuids.length).toEqual(1)
	expect(uuidCreator.exist(1)).toBeTruthy()
})
