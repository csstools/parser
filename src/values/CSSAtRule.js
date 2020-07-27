import { defineClass } from './CSSValue.utils.js'
import CSSRule from './CSSBlock.js'

/**
 *
 * ## CSSAtRule
 *
 * The CSSAtRule class is the container object for stylesheet at-rules in CSS.
 *
 * @class @extends {CSSBlock}
 * @argument {CSSAtRuleItems} [items]
 */
export default function CSSAtRule(items) {
	/** @type {CSSAtRuleItems} */
	this.items = Object(items)
}

defineClass(`CSSAtRule`, CSSAtRule, CSSRule, {})

/** @typedef {import("./CSSValue.js")} CSSValue */
/** @typedef {{ [key: string]: CSSValue | CSSValue[], detail: { [key: string]: CSSValue[] } }} CSSAtRuleItems */
