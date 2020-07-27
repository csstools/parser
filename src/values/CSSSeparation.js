import { defineClass, toConcatenatedString, toJSONObject } from './CSSValue.utils.js'
import CSSGroup from './CSSGroup.js'

/**
 *
 * ## CSSSeparation
 *
 * The CSSSeparation class is the container of separated groups and tokens in CSS.
 *
 * @class @extends {CSSGroup}
 */
export default function CSSSeparation(items) {
	this.items = Object(items)
}

defineClass(`CSSSeparation`, CSSSeparation, CSSGroup, {
	// Methods
	toJSON: [ 6, function toJSON() {
		const { items } = this

		return {
			constructor: this.constructor.name,
			separator:   items.separator,
			value:       toJSONObject(items.value),
		}
	} ],
	toString: [ 6, function toString() {
		const { items } = this

		return toConcatenatedString(
			items.separator,
			items.extra.beforeValue,
			items.value,
			items.extra.afterValue
		)
	} ],
})

/** @typedef {import("./CSSValue.js")} CSSValue */
