import { defineClass } from '../CSSValue.utils.js'
import CSSRule from './CSSRule.js'

/**
 *
 * ## CSSStyleRule
 *
 * The CSSStyleRule class is the container object for stylesheet rules in CSS.
 *
 * @class @extends {CSSRule}
 */
export default function CSSStyleRule(raw) {
	this.raw = Object(raw)
}

defineClass(`CSSStyleRule`, CSSStyleRule, CSSRule, {})
