import { defineClass } from './CSSValue.utils.js'
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

defineClass(`CSSRule`, CSSRule, CSSBlock, {})

/** @typedef {import("./CSSValue.js")} CSSValue */
/** @typedef {{ [key: string]: CSSValue | CSSValue[], detail: { [key: string]: CSSValue[] } }} CSSRuleItems */
