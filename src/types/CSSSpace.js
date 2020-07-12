import { toEnumerableDescriptor, toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSValue from './CSSValue.js'

class CSSSpace extends CSSValue {}

Object.defineProperties(CSSSpace.prototype, {
	type:    toNonEnumerableDescriptor(`CSSSpace`),
	entries: toNonEnumerableDescriptor([`value`]),
	value:   toEnumerableDescriptor(` `),
})

export default CSSSpace
