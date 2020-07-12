import { toEnumerableDescriptor, toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSFragment from './CSSFragment.js'

class CSSFunction extends CSSFragment {}

Object.defineProperties(CSSFunction.prototype, {
	type:    toNonEnumerableDescriptor(`CSSFunction`),
	entries: toNonEnumerableDescriptor([`name`, `opener`, `value`, `closer`]),
	name:    toEnumerableDescriptor(`-`),
	opener:  toEnumerableDescriptor(`(`),
	value:   toEnumerableDescriptor([]),
	closer:  toEnumerableDescriptor(`)`),
})

export default CSSFunction
