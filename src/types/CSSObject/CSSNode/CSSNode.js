import CSSObject from '../CSSObject.js'

import defineNonEnumerableGetter from '../../../utils/defineNonEnumerableGetter.js'
import defineNonEnumerableValue from '../../../utils/defineNonEnumerableValue.js'

export default class CSSNode extends CSSObject {}

const { prototype } = CSSNode

defineNonEnumerableGetter(prototype, `toJSON`, function toJSON() {
	const self = this

	return Object.keys(self).reduce(
		(object, name) => {
			if (name !== `source`) {
				object[name] = self[name]
			}

			return object
		},
		{
			type: self.constructor.name,
		}
	)
})

defineNonEnumerableValue(prototype, `toString`, function toString() {
	const buffer = []
	const { toStringTypes } = this
	for (const name in toStringTypes) {
		buffer.push(
			toStringTypes[name](
				this[name]
			)
		)
	}
	return buffer.join(``)
})

defineNonEnumerableGetter(prototype, `parent`)
