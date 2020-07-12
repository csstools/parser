import { toEnumerableDescriptor, toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSValue from './CSSValue.js'

class CSSSymbol extends CSSValue {}

Object.defineProperties(CSSSymbol.prototype, {
	type:    toNonEnumerableDescriptor(`CSSSymbol`),
	entries: toNonEnumerableDescriptor([`value`]),
	value:   toEnumerableDescriptor(`-`),
})

export default CSSSymbol
