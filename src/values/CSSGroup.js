import { defineClass, toConcatenatedString, toConcatenatedValues, toJSONObject } from './CSSValue.utils.js'
import CSSValue from './CSSValue.js'

export default function CSSGroup(items) {
	this.items = Object(items)
}

defineClass(`CSSGroup`, CSSGroup, CSSValue, {
	isCSSToken: [ 6, false ],

	// Methods
	toJSON: [ 6, function toJSON() {
		return {
			constructor: this.constructor.name,
			value:       toJSONObject(this.items.value),
		}
	} ],
	toString: [ 6, function toString() {
		return toConcatenatedString(
			this.items.value
		)
	} ],
	toValues: [ 6, function toValues() {
		return toConcatenatedValues(
			this.items.value
		)
	} ],
})
