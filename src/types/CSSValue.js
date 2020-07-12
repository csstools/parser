import { toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSNode from './CSSNode.js'

class CSSValue extends CSSNode {}

Object.defineProperties(CSSValue.prototype, {
	type: toNonEnumerableDescriptor(`CSSValue`),
})

export default CSSValue
