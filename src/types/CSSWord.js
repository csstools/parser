import { toEnumerableDescriptor, toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSValue from './CSSValue.js'

class CSSWord extends CSSValue {}

Object.defineProperties(CSSWord.prototype, {
	type:    toNonEnumerableDescriptor(`CSSWord`),
	entries: toNonEnumerableDescriptor([`value`]),
	value:   toEnumerableDescriptor(`-`),
})

export default CSSWord
