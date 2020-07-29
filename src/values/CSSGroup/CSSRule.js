import { defineClass, prelude, toConcatenatedValues, toJSONObject, toString } from '../CSSValue.utils.js'
import CSSBlock from './CSSBlock.js'

/**
 *
 * ## CSSRule
 *
 * The CSSRule class is the container object for rules in CSS.
 *
 * @class @extends {CSSBlock}
 */
export default function CSSRule(raw) {
	this.raw = Object(raw)
}

defineClass(`CSSRule`, CSSRule, CSSBlock, {
	// Methods
	toJSON: [ 6, function toJSON() {
		return {
			constructor: this.constructor.name,
			prelude:     toJSONObject(this.prelude),
			values:      toJSONObject(this.values),
		}
	} ],
	toString: [ 6, toString ],
	toValues: [ 6, function toValues() {
		const { raw } = this

		return toConcatenatedValues(
			raw.prelude,
			raw.betweenPreludeAndOpening,
			raw.opening,
			raw.value,
			raw.closing
		)
	} ],

	// Accessors
	prelude: [ 11, prelude ],
	detail:  [ 11, function () {
		const { raw } = this

		return {
			betweenPreludeAndOpening: raw.betweenPreludeAndOpening,
		}
	} ],
})

/** @typedef {import("../CSSValue.js")} CSSValue */
/** @typedef {{ [key: string]: CSSValue | CSSValue[], detail: { [key: string]: CSSValue[] } }} CSSRuleItems */
