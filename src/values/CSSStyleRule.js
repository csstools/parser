import { defineClass } from './CSSValue.utils.js'
import CSSRule from './CSSRule.js'

/**
 *
 * ## CSSStyleRule
 *
 * The CSSStyleRule class is the container object for stylesheet rules in CSS.
 *
 * @class @extends {CSSRule}
 * @argument {CSSStyleRuleItems} [items]
 */
export default function CSSStyleRule(items) {
	/** @type {CSSStyleRuleItems} */
	this.items = Object(items)
}

defineClass(`CSSStyleRule`, CSSStyleRule, CSSRule, {})

/** @typedef {import("./CSSValue.js")} CSSValue */
/** @typedef {{ [key: string]: CSSValue | CSSValue[], detail: { [key: string]: CSSValue[] } }} CSSStyleRuleItems */
