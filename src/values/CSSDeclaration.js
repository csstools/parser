import { defineClass, toConcatenatedString, toJSONObject, toValueString } from './CSSValue.utils.js'
import CSSGroup from './CSSGroup.js'

/**
 *
 * ## CSSDeclaration
 *
 * The CSSDeclaration class is the container of declarations in CSS.
 *
 * @class @extends {CSSGroup}
 */
export default function CSSDeclaration(items) {
	this.items = Object(items)
}

defineClass(`CSSDeclaration`, CSSDeclaration, CSSGroup, {
	// Methods
	toJSON: [ 6, function toJSON() {
		const { items } = this

		return {
			constructor: this.constructor.name,
			name:        toValueString(items.name),
			value:       toJSONObject(items.value),
			important:   Boolean(items.important),
		}
	} ],
	toString: [ 6, function toString() {
		const { items } = this

		return toConcatenatedString(
			items.name,
			items.extra.betweenNameAndOpening,
			items.opening,
			items.extra.betweenOpeningAndValue,
			items.value,
			items.extra.betweenValueAndImportant,
			items.important,
			items.extra.betweenValueAndClosing,
			items.closing
		)
	} ],
})

/** @typedef {import("./CSSValue.js")} CSSValue */
