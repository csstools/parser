import { toEnumerableDescriptor, toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSValue from './CSSValue.js'

class CSSComment extends CSSValue {}

Object.defineProperties(CSSComment.prototype, {
	type:    toNonEnumerableDescriptor(`CSSComment`),
	entries: toNonEnumerableDescriptor([`opener`, `value`, `closer`]),
	opener:  toEnumerableDescriptor(`/*`),
	value:   toEnumerableDescriptor(``),
	closer:  toEnumerableDescriptor(`*/`),
})

export default CSSComment
