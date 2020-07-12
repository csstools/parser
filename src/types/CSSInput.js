import { toEnumerableDescriptor, toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSObject from './CSSObject.js'

class CSSInput extends CSSObject {}

Object.defineProperties(CSSInput.prototype, {
	type: toNonEnumerableDescriptor(`CSSInput`),
	file: toEnumerableDescriptor(`-`),
	data: toEnumerableDescriptor(``),
})

export default CSSInput
