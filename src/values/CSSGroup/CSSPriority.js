import { defineClass, toConcatenatedValues, toString, toValueString } from '../CSSValue.utils.js'
import CSSGroup from '../CSSGroup.js'

/**
 * CSSPriority
 * @class @extends CSSGroup
 */
export default function CSSPriority(raw) {
	this.raw = Object(raw)
}

defineClass(`CSSPriority`, CSSPriority, CSSGroup, {
	/* CSSPriority {
		value: String(this.raw.value)
		raw: {
			symbol?: CSSValue
			betweenSymbolAndValue?: CSSValue[]
			value?: CSSValue
		}
	} */

	// Methods
	toJSON: [ 6, function toJSON() {
		return {
			constructor: this.constructor.name,
			value:       String(this),
		}
	} ],
	toString: [ 6, toString ],
	toValues: [ 6, function toValues() {
		const { raw } = this

		return toConcatenatedValues(
			raw.symbol,
			raw.betweenSymbolAndValue,
			raw.value
		)
	} ],

	// Accessors
	symbol: [ 11, function () {
		return this.raw.symbol
	} ],
	value: [ 11, function () {
		return this.raw.value
	} ],
	detail: [ 11, function () {
		const { raw } = this

		return {
			betweenSymbolAndValue: raw.betweenSymbolAndValue,
		}
	} ],
})
