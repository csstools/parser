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
		try {
			return toConcatenatedString(
				this.items.value
			)
		} catch (error) {
			console.log(this)

			throw error
		}
	} ],
	toValues: [ 6, function toValues() {
		return toConcatenatedValues(
			this.items.value
		)
	} ],

	// Accessors
	position: [ 10, function () {
		return this.toValues()[0].source
	} ],
	value: [ 11, function () {
		return this.items.value
	} ],
})
