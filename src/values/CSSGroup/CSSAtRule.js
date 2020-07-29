import { defineClass, name, toConcatenatedValues, toString } from '../CSSValue.utils.js'
import CSSRule from './CSSRule.js'

/**
 * ## CSSAtRule
 *
 * The CSSAtRule class is the container object for values that make up an at-rule.
 *
 * @class @extends {CSSToken}
 */
export default function CSSAtRule(raw) {
	this.raw = Object(raw)
}

defineClass(`CSSAtRule`, CSSAtRule, CSSRule, {
	// Methods
	toJSON: [ 6, function toJSON() {
		return {
			constructor: this.constructor.name,
			name:        this.name,
			prelude:     this.value,
			value:       this.values,
		}
	} ],
	toString: [ 6, toString ],
	toValues: [ 6, function toValues() {
		const { raw } = this

		return toConcatenatedValues(
			raw.name,
			raw.betweenNameAndPrelude,
			raw.prelude,
			raw.betweenPreludeAndOpening,
			raw.opening,
			raw.value,
			raw.closing
		)
	} ],

	// Accessors
	name:   [ 11, name ],
	detail: [ 11, function () {
		const { raw } = this

		return {
			betweenNameAndPrelude:    raw.betweenNameAndPrelude,
			betweenPreludeAndOpening: raw.betweenPreludeAndOpening,
		}
	} ],
})

/** @typedef {import("../CSSValue.js")} CSSValue */
/** @typedef {{ [key: string]: CSSValue | CSSValue[], detail: { [key: string]: CSSValue[] } }} CSSAtRuleItems */
