import { defineClass, toConcatenatedString } from './CSSValue.utils.js'
import CSSGroup from './CSSGroup.js'

/**
 * CSS Declaration Important
 * @class @extends CSSGroup
 */
export default function CSSDeclarationImportant(items) {
	this.items = Object(items)
}

defineClass(`CSSDeclarationImportant`, CSSDeclarationImportant, CSSGroup, {
	toString: [ 6, function toString() {
		const { items } = this

		return toConcatenatedString(
			items.symbol,
			items.extra.betweenSymbolAndValue,
			items.value
		)
	} ],
})
