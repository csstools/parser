import { defineClass } from './CSSValue.utils.js'
import CSSGroup from './CSSGroup.js'

/**
 *
 * ## CSSStyleSheet
 *
 * The CSSStyleSheet class is the container of styled rules in CSS.
 *
 * @class @extends {CSSGroup}
 */
export default function CSSStyleSheet(items) {
	this.items = Object(items)
}

defineClass(`CSSStyleSheet`, CSSStyleSheet, CSSGroup, {})
