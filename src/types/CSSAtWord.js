import { toEnumerableDescriptor, toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSValue from './CSSValue.js'

class CSSAtWord extends CSSValue {}

Object.defineProperties(CSSAtWord.prototype, {
	type:    toNonEnumerableDescriptor(`CSSAtWord`),
	entries: toNonEnumerableDescriptor([`prefix`, `value`]),
	prefix:  toEnumerableDescriptor(`@`),
	value:   toEnumerableDescriptor(`-`),
})

export default CSSAtWord
