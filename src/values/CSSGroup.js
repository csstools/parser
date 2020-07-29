import { defineClass, source, toConcatenatedValues, toJSONObject, toString, values } from './CSSValue.utils.js'
import CSSValue from './CSSValue.js'

export default function CSSGroup(raw) {
	this.raw = Object(raw)
}

defineClass(`CSSGroup`, CSSGroup, CSSValue, {
	/* CSSGroup {
		value: String(this.raw.value)
		values: Array(this.raw.values)
		raw: {
			opening?: CSSValue
			value?: CSSValue[]
			closing?: CSSValue
		}
	} */
	isCSSGroup: [ 6, true ],

	// Methods
	toJSON: [ 6, function toJSON() {
		return {
			constructor: this.constructor.name,
			values:      toJSONObject(this.values),
		}
	} ],
	toString: [ 6, toString ],
	toValues: [ 6, function toValues() {
		return toConcatenatedValues(
			this.raw.value
		)
	} ],

	// Accessors
	source: [ 11, source ],
	value:  [ 11, values ],
})
