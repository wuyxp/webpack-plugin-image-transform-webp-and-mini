import { utilsInterface } from './interface'
const utils: utilsInterface = {
  isString(p) {
    return Object.prototype.toString.call(p) === '[object String]'
  },
  isNumber(p) {
    return Object.prototype.toString.call(p) === '[object Number]'
  },
  isBoolean(p) {
    return Object.prototype.toString.call(p) === '[object Boolean]'
  },
  isSymbol(p) {
    return Object.prototype.toString.call(p) === '[object Symbol]'
  },
  isUndefined(p) {
    return Object.prototype.toString.call(p) === '[object Undefined]'
  },
  isNull(p) {
    return Object.prototype.toString.call(p) === '[object Null]'
  },
  isFunction(p) {
    return Object.prototype.toString.call(p) === '[object Function]'
  },
  isDate(p) {
    return Object.prototype.toString.call(p) === '[object Date]'
  },
  isArray(p) {
    return Object.prototype.toString.call(p) === '[object Array]'
  },
  isRegExp(p) {
    return Object.prototype.toString.call(p) === '[object RegExp]'
  },
  isObject(p) {
    return Object.prototype.toString.call(p) === '[object Object]'
  }
}

export default utils