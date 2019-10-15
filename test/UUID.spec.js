import { uuid as uuidCreator } from '../src/helpers'

// test('should created UUID class', () => {
// 	expect(uuidCreator).toBeInstanceOf(UUID)
// })

test('should create uuid', () => {
	const uuid = uuidCreator.create()
	expect(typeof uuid).toBe('string')
	expect(uuid.length).toEqual(36)
})

test('should check uuid on unique', () => {
	expect(uuidCreator.exist(1)).toBeFalsy()
	expect(uuidCreator.uuids.includes(1)).toBeTruthy()
	expect(uuidCreator.exist(1)).toBeTruthy()
})
