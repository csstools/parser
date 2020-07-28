import { defineClass, toValueString } from './CSSValue.utils.js'
import CSSRule from './CSSRule.js'

/**
 * ## CSSAtRule
 *
 * The CSSAtRule class is the container object for values that make up an at-rule.
 *
 * @class @extends {CSSToken}
 * @argument {CSSAtRuleItems} items
 */
export default function CSSAtRule(items) {
	/** @type {CSSAtRuleItems} */
	this.items = Object(items)
}

defineClass(`CSSAtRule`, CSSAtRule, CSSRule, {
	// Accessors
	name: [ 11, function () {
		return toValueString(this.items.name)
	} ],
})

/** @typedef {import("./CSSValue.js")} CSSValue */
/** @typedef {{ [key: string]: CSSValue | CSSValue[], detail: { [key: string]: CSSValue[] } }} CSSAtRuleItems */
