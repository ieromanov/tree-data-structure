import {
	isArray,
	isObject,
	isBoolean,
	isDate,
	isFunction,
	isNull,
	isNumber,
	isRegExp,
	isString,
	isSymbol,
	isUndefined
} from '../src/helpers'

test('should isArray method return true only on Array type', () => {
	expect(isArray([])).toBeTruthy()
	expect(isArray(new Array())).toBeTruthy()

	expect(isArray(new RegExp())).toBeFalsy()
	expect(isArray(new Date())).toBeFalsy()
	expect(isArray(function () {})).toBeFalsy()
	expect(isArray({})).toBeFalsy()
	expect(isArray(123)).toBeFalsy()
	expect(isArray(true)).toBeFalsy()
	expect(isArray('test')).toBeFalsy()
	expect(isArray(NaN)).toBeFalsy()
	expect(isArray(null)).toBeFalsy()
	expect(isArray(undefined)).toBeFalsy()
})

test('should isObject method return true only on Object type', () => {
	expect(isObject({})).toBeTruthy()
	expect(isObject(new Object())).toBeTruthy()
	
	expect(isObject(new RegExp())).toBeFalsy()
	expect(isObject(new Date())).toBeFalsy()
	expect(isObject(function () {})).toBeFalsy()
	expect(isObject([])).toBeFalsy()
	expect(isObject(123)).toBeFalsy()
	expect(isObject(true)).toBeFalsy()
	expect(isObject('test')).toBeFalsy()
	expect(isObject(NaN)).toBeFalsy()
	expect(isObject(null)).toBeFalsy()
	expect(isObject(undefined)).toBeFalsy()
})

test('should isBoolean method return true only on Boolean type', () => {
	expect(isBoolean(true)).toBeTruthy()

	expect(isBoolean(new RegExp())).toBeFalsy()
	expect(isBoolean(new Date())).toBeFalsy()
	expect(isBoolean(function () {})).toBeFalsy()
	expect(isBoolean({})).toBeFalsy()
	expect(isBoolean([])).toBeFalsy()
	expect(isBoolean(123)).toBeFalsy()
	expect(isBoolean('test')).toBeFalsy()
	expect(isBoolean(NaN)).toBeFalsy()
	expect(isBoolean(null)).toBeFalsy()
	expect(isBoolean(undefined)).toBeFalsy()
})

test('should isDate method return true only on Date type', () => {
	expect(isDate(new Date())).toBeTruthy()
	
	expect(isDate(new RegExp())).toBeFalsy()
	expect(isDate({})).toBeFalsy()
	expect(isDate(function () {})).toBeFalsy()
	expect(isDate([])).toBeFalsy()
	expect(isDate(123)).toBeFalsy()
	expect(isDate('test')).toBeFalsy()
	expect(isDate(NaN)).toBeFalsy()
	expect(isDate(null)).toBeFalsy()
	expect(isDate(undefined)).toBeFalsy()
})

test('should isFunction method return true only on Function type', () => {
	expect(isFunction(function () {})).toBeTruthy()
	expect(isFunction(new Function())).toBeTruthy()
	
	expect(isFunction(new RegExp())).toBeFalsy()
	expect(isFunction(new Date())).toBeFalsy()
	expect(isFunction({})).toBeFalsy()
	expect(isFunction([])).toBeFalsy()
	expect(isFunction(123)).toBeFalsy()
	expect(isFunction('test')).toBeFalsy()
	expect(isFunction(NaN)).toBeFalsy()
	expect(isFunction(null)).toBeFalsy()
	expect(isFunction(undefined)).toBeFalsy()
})

test('should isNull method return true only on Null type', () => {
	expect(isNull(null)).toBeTruthy()
	
	expect(isNull(new RegExp())).toBeFalsy()
	expect(isNull(function () {})).toBeFalsy()
	expect(isNull(new Date())).toBeFalsy()
	expect(isNull({})).toBeFalsy()
	expect(isNull([])).toBeFalsy()
	expect(isNull(123)).toBeFalsy()
	expect(isNull('test')).toBeFalsy()
	expect(isNull(NaN)).toBeFalsy()
	expect(isNull(undefined)).toBeFalsy()
})

test('should isNumber method return true only on Number type', () => {
	expect(isNumber(123)).toBeTruthy()
	
	expect(isNumber(new RegExp())).toBeFalsy()
	expect(isNumber(function () {})).toBeFalsy()
	expect(isNumber(new Date())).toBeFalsy()
	expect(isNumber({})).toBeFalsy()
	expect(isNumber([])).toBeFalsy()
	expect(isNumber('test')).toBeFalsy()
	expect(isNumber(NaN)).toBeFalsy()
	expect(isNumber(null)).toBeFalsy()
	expect(isNumber(undefined)).toBeFalsy()
})

test('should isRegExp method return true only on RegExp type', () => {
	expect(isRegExp(new RegExp())).toBeTruthy()

	expect(isRegExp(123)).toBeFalsy()
	expect(isRegExp(function () {})).toBeFalsy()
	expect(isRegExp(new Date())).toBeFalsy()
	expect(isRegExp({})).toBeFalsy()
	expect(isRegExp([])).toBeFalsy()
	expect(isRegExp('test')).toBeFalsy()
	expect(isRegExp(NaN)).toBeFalsy()
	expect(isRegExp(null)).toBeFalsy()
	expect(isRegExp(undefined)).toBeFalsy()
})

test('should isString method return true only on String type', () => {
	expect(isString('test')).toBeTruthy()
	
	expect(isString(new RegExp())).toBeFalsy()
	expect(isString(123)).toBeFalsy()
	expect(isString(function () {})).toBeFalsy()
	expect(isString(new Date())).toBeFalsy()
	expect(isString({})).toBeFalsy()
	expect(isString([])).toBeFalsy()
	expect(isString(NaN)).toBeFalsy()
	expect(isString(null)).toBeFalsy()
	expect(isString(undefined)).toBeFalsy()
})

test('should isUndefined method return true only on Undefined type', () => {
	expect(isUndefined(undefined)).toBeTruthy()
	
	expect(isUndefined('test')).toBeFalsy()
	expect(isUndefined(new RegExp())).toBeFalsy()
	expect(isUndefined(123)).toBeFalsy()
	expect(isUndefined(function () {})).toBeFalsy()
	expect(isUndefined(new Date())).toBeFalsy()
	expect(isUndefined({})).toBeFalsy()
	expect(isUndefined([])).toBeFalsy()
	expect(isUndefined(NaN)).toBeFalsy()
	expect(isUndefined(null)).toBeFalsy()
})