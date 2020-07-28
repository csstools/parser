import { defineClass, toConcatenatedString, toConcatenatedValues, toJSONObject, toValueString } from './CSSValue.utils.js'
import CSSGroup from './CSSGroup.js'

export default function CSSBlock(items) {
	this.items = Object(items)
}

defineClass(`CSSBlock`, CSSBlock, CSSGroup, {
	// Methods
	toJSON: [ 6, function toJSON() {
		const { items } = this

		return {
			constructor: this.constructor.name,
			opening:     toValueString(items.opening),
			value:       toJSONObject(items.value),
			closing:     toValueString(items.closing),
		}
	} ],
	toString: [ 6, function toString() {
		const { items } = this

		return toConcatenatedString(
			items.opening,
			items.value,
			items.closing
		)
	} ],
	toValues: [ 6, function toValues() {
		const { items } = this

		return toConcatenatedValues(
			items.opening,
			items.value,
			items.closing
		)
	} ],

	// Accessors
	openingType: [ 10, function () {
		return toValueString(this.items.opening).charCodeAt(0)
	} ],

	// Accessors
	opening: [ 11, function () {
		return toValueString(this.items.opening)
	} ],
	closing: [ 11, function () {
		return toValueString(this.items.closing)
	} ],
})
