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
export default function CSSStyleSheet(raw) {
	this.raw = Object(raw)
}

defineClass(`CSSStyleSheet`, CSSStyleSheet, CSSGroup, {
	/* CSSGroup {
		value: String(this.raw.value)
		values: Array(this.raw.values)
		raw: {
			opening?: CSSValue
			value?: CSSValue[]
			closing?: CSSValue
		}
	} */
	isCSSStyleSheet: [ 6, true ],
})
