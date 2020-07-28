import { defineClass, toConcatenatedString, toConcatenatedValues, toValueString } from './CSSValue.utils.js'
import CSSGroup from './CSSGroup.js'

/**
 * CSS Declaration Important
 * @class @extends CSSGroup
 */
export default function CSSDeclarationImportant(items) {
	this.items = Object(items)
}

defineClass(`CSSDeclarationImportant`, CSSDeclarationImportant, CSSGroup, {
	toJSON: [ 6, function toJSON() {
		const { items } = this

		return {
			constructor: this.constructor.name,
			value:       toValueString(items.value),
		}
	} ],
	toString: [ 6, function toString() {
		const { items } = this

		return toConcatenatedString(
			items.symbol,
			items.extra.betweenSymbolAndValue,
			items.value
		)
	} ],
	toValues: [ 6, function toValues() {
		const { items } = this

		return toConcatenatedValues(
			items.symbol,
			items.extra.betweenSymbolAndValue,
			items.value
		)
	} ],

	// Accessors
	value: [ 11, function () {
		return String(this)
	} ],
})
