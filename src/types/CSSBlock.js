import { toEnumerableDescriptor, toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSFragment from './CSSFragment.js'

class CSSBlock extends CSSFragment {}

Object.defineProperties(CSSBlock.prototype, {
	type:    toNonEnumerableDescriptor(`CSSBlock`),
	entries: toNonEnumerableDescriptor([`opener`, `value`, `closer`]),
	opener:  toEnumerableDescriptor(`{`),
	value:   toEnumerableDescriptor([]),
	closer:  toEnumerableDescriptor(`}`),
})

export default CSSBlock
