import CSSObject from '../CSSObject.js'

import defineNonEnumerableGetter from '../../../utils/defineNonEnumerableGetter.js'
import defineNonEnumerableValue from '../../../utils/defineNonEnumerableValue.js'
import toJSON from '../../../utils/toJSON.js'

export default class CSSHost extends CSSObject {}

const { prototype } = CSSHost

defineNonEnumerableValue(prototype, `toJSON`, toJSON)

defineNonEnumerableValue(prototype, `toString`, function toString() {
	const buffer = []
	const { nodes, toStringTypes } = this
	for (const name in toStringTypes) {
		buffer.push(
			toStringTypes[name](
				nodes[name],
				name
			)
		)
	}
	return buffer.join(``)
})

defineNonEnumerableGetter(prototype, `parent`)
