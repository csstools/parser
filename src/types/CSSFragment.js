import { toEnumerableDescriptor, toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSValue from './CSSValue.js'

class CSSFragment extends CSSValue {}

Object.defineProperties(CSSFragment.prototype, {
	type:    toNonEnumerableDescriptor(`CSSFragment`),
	entries: toNonEnumerableDescriptor([`value`]),
	value:   toEnumerableDescriptor([]),
})

export default CSSFragment
