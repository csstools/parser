import { defineClass, toConcatenatedString, toConcatenatedValues, toJSONObject } from './CSSValue.utils.js'
import CSSGroup from './CSSGroup.js'

/**
 *
 * ## CSSSelector
 *
 * The CSSSelector class is the token object for all selectors in CSS.
 *
 * @class @extends {CSSGroup}
 * @argument {CSSSelectorItems} [items]
 */
export default function CSSSelector(items) {
	/** @type {CSSSelectorItems} */
	this.items = Object(items)
}

defineClass(`CSSSelector`, CSSSelector, CSSGroup, {

	// Methods
	toJSON: [ 6, function toJSON() {
		const { items } = this

		return {
			constructor: this.constructor.name,
			symbol:      toJSONObject(items.symbol),
			value:       toJSONObject(items.value),
		}
	} ],
	toString: [ 6, function toString() {
		const { items } = this

		return toConcatenatedString(
			items.symbol,
			items.value
		)
	} ],
	toValues: [ 6, function toValues() {
		const { items } = this

		return toConcatenatedValues(
			items.symbol,
			items.value
		)
	} ],
})

/** @typedef {import("./CSSValue.js")} CSSValue */
/** @typedef {{ [key: string]: CSSValue | CSSValue[], detail: { [key: string]: CSSValue[] } }} CSSSelectorItems */
