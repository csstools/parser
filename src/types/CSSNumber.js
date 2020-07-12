import { toEnumerableDescriptor, toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSValue from './CSSValue.js'

class CSSNumber extends CSSValue {}

Object.defineProperties(CSSNumber.prototype, {
	type:    toNonEnumerableDescriptor(`CSSNumber`),
	entries: toNonEnumerableDescriptor([`value`, `unit`]),
	value:   toEnumerableDescriptor(`0`),
	unit:    toEnumerableDescriptor(``),
})

export default CSSNumber
