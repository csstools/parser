import { toEnumerableDescriptor, toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSValue from './CSSValue.js'

class CSSString extends CSSValue {}

Object.defineProperties(CSSString.prototype, {
	type:    toNonEnumerableDescriptor(`CSSString`),
	entries: toNonEnumerableDescriptor([`opener`, `value`, `closer`]),
	opener:  toEnumerableDescriptor(`"`),
	value:   toEnumerableDescriptor(``),
	closer:  toEnumerableDescriptor(`"`),
})

export default CSSString
