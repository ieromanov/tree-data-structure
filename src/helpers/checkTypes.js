export const isString = v => typeof v === 'string' || v instanceof String

export const isNumber = v => typeof v === 'number' && isFinite(v)

export const isArray = v => v && typeof v === 'object' && v.constructor === Array

export const isObject = v => v && typeof v === 'object' && v.constructor === Object

export const isFunction = v => typeof v === 'function'

export const isNull = v => v === null

export const isUndefined = v => typeof v === 'undefined'

export const isBoolean = v => typeof v === 'boolean'

export const isRegExp = v => v && typeof v === 'object' && v.constructor === RegExp

export const isDate = v => v instanceof Date

export const isSymbol = v => typeof v === 'symbol'