import { toNonEnumerableDescriptor } from '../utils/toDescriptor.js'

class CSSObject {}

Object.defineProperties(CSSObject, {
	create: toNonEnumerableDescriptor(function create(init) {
		return Object.assign(Object.create(this.prototype), init)
	}),
})

export default CSSObject
