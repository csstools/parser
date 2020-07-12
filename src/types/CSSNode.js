import { toNonEnumerableDescriptor } from '../utils/toDescriptor.js'
import CSSObject from './CSSObject.js'

class CSSNode extends CSSObject {}

Object.defineProperties(CSSNode.prototype, {
	type:    toNonEnumerableDescriptor(`CSSNode`),
	entries: toNonEnumerableDescriptor([]),
	parent:  toNonEnumerableDescriptor(null),
	toJSON:  toNonEnumerableDescriptor(function toJSON() {
		const self = this
		const object = { type: self.type }
		self.entries.forEach((name) => {
			const entry = self[name]
			if (entry != null) {
				object[name] = Array.isArray(entry)
					? entry.map(Function.call.bind(toJSON))
					: entry === Object(entry)
						? toJSON.call(entry)
						: entry
			}
		})

		return object
	}),
	toString: toNonEnumerableDescriptor(function toString() {
		const self = this
		const string = []

		self.entries.forEach((name) => {
			const entry = self[name]

			if (entry != null) {
				if (Array.isArray(entry)) {
					string.push(...entry)
				} else {
					string.push(entry)
				}
			}
		})

		return string.join(``)
	}),
})

export default CSSNode
