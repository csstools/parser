import { defineClass, toConcatenatedString, toConcatenatedValues, toJSONObject, toValueString } from './CSSValue.utils.js'
import CSSBlock from './CSSBlock.js'

/**
 *
 * ## CSSRule
 *
 * The CSSRule class is the container object for rules in CSS.
 *
 * @class @extends {CSSBlock}
 * @argument {CSSRuleItems} [items]
 */
export default function CSSRule(items) {
	/** @type {CSSRuleItems} */
	this.items = Object(items)
}

defineClass(`CSSRule`, CSSRule, CSSBlock, {
	// Methods
	toJSON: [ 6, function toJSON() {
		const { items } = this

		return {
			constructor: this.constructor.name,
			name:        items.name,
			prelude:     toJSONObject(items.prelude),
			opening:     toValueString(items.opening),
			value:       toJSONObject(items.value),
			closing:     toValueString(items.closing),
		}
	} ],
	toString: [ 6, function toString() {
		const { items } = this

		return toConcatenatedString(
			items.name,
			items.extra.betweenNameAndPrelude,
			items.prelude,
			items.extra.betweenPreludeAndOpening,
			items.opening,
			items.value,
			items.closing
		)
	} ],
	toValues: [ 6, function toValues() {
		const { items } = this

		return toConcatenatedValues(
			items.name,
			items.extra.betweenNameAndPrelude,
			items.prelude,
			items.extra.betweenPreludeAndOpening,
			items.opening,
			items.value,
			items.closing
		)
	} ],
})

/** @typedef {import("./CSSValue.js")} CSSValue */
/** @typedef {{ [key: string]: CSSValue | CSSValue[], detail: { [key: string]: CSSValue[] } }} CSSRuleItems */
