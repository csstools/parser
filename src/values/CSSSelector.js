import { defineClass, toConcatenatedValues, toJSONObject, toString } from './CSSValue.utils.js'
import CSSGroup from './CSSGroup.js'

/**
 *
 * ## CSSSelector
 *
 * The CSSSelector class is the token object for all selectors in CSS.
 *
 * @class @extends {CSSGroup}
 */
export default function CSSSelector(raw, type) {
	this.raw = Object(raw)
	this.type = type || `unknown`
}

defineClass(`CSSSelector`, CSSSelector, CSSGroup, {
	// Methods
	toJSON: [ 6, function toJSON() {
		return {
			constructor: this.constructor.name,
			symbol:      toJSONObject(this.raw.symbol),
			value:       toJSONObject(this.raw.value),
		}
	} ],
	toString: [ 6, toString ],
	toValues: [ 6, function toValues() {
		return toConcatenatedValues(
			this.raw.symbol,
			this.raw.value
		)
	} ],
})
