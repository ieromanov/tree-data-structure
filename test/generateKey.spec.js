import { generateKey } from '../src/helpers'

test('should generate key by data and key', () => {
	const key = generateKey(15, 'name')
	expect(key).toEqual('15:number:name')
	const arrKey = generateKey([1,2,3], 'arr-key')
	expect(arrKey).toEqual('1,2,3:object:arr-key')
})