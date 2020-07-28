import { defineClass, separator, toConcatenatedValues, toJSONObject, toString, value, values } from './CSSValue.utils.js'
import CSSGroup from './CSSGroup.js'

/**
 *
 * ## CSSSeparation
 *
 * The CSSSeparation class is the container of values that are separated in CSS.
 *
 * Examples include comma separated lists, like those in a `var()` function,
 * or selectors in a style rule.
 *
 * @class @extends {CSSGroup}
 */
export default function CSSSeparation(raw) {
	this.raw = Object(raw)
}

defineClass(`CSSSeparation`, CSSSeparation, CSSGroup, {
	// Methods
	toJSON: [ 6, function toJSON() {
		return {
			constructor: this.constructor.name,
			separator:   this.separator,
			values:      toJSONObject(this.values),
		}
	} ],
	toString: [ 6, toString ],
	toValues: [ 6, function toValues() {
		const { raw } = this

		return toConcatenatedValues(
			raw.separator,
			raw.beforeValue,
			raw.value,
			raw.afterValue
		)
	} ],

	// Accessors
	value:     [ 10, value ],
	values:    [ 10, values ],
	separator: [ 10, separator ],
})
