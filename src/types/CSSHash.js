import { toEnumerableDescriptor, toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSValue from './CSSValue.js'

class CSSHash extends CSSValue {}

Object.defineProperties(CSSHash.prototype, {
	type:    toNonEnumerableDescriptor(`CSSHash`),
	entries: toNonEnumerableDescriptor([`prefix`, `value`]),
	prefix:  toEnumerableDescriptor(`#`),
	value:   toEnumerableDescriptor(`-`),
})

export default CSSHash
