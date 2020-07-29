import { defineClass, toConcatenatedString } from './CSSValue.utils.js'
import CSSValue from './CSSValue.js'

const { charCodeAt } = String.prototype

export default function CSSToken() {}

defineClass(`CSSToken`, CSSToken, CSSValue, {
	isCSSToken: [ 6, false ],

	// Methods
	toJSON: [ 6, function toJSON() {
		return {
			constructor: this.constructor.name,
			value:       this.value,
		}
	} ],
	toString: [ 6, function toString() {
		return toConcatenatedString(
			this.value
		)
	} ],
	toValues: [ 6, function toValues() {
		return [ this ]
	} ],

	// Accessors
	type: [ 11, function () {
		return charCodeAt.call(this.value, 0)
	} ],
})
