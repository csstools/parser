import { defineClass } from './CSSValue.utils.js'
import CSSGroup from './CSSGroup.js'

/**
 *
 * ## CSSSelector
 *
 * The CSSSelector class is the token object for all selectors in CSS.
 *
 * @class @extends {CSSGroup}
 * @argument {CSSSelectorSource} [source]
 */
export default function CSSSelector(source) {
	/** @type {CSSSelectorSource} */
	this.source = Object(source)
	this.source.detail = Object(this.source.detail)
}

defineClass(`CSSSelector`, CSSSelector, CSSGroup, {})

/** @typedef {import("./CSSValue.js")} CSSValue */
/** @typedef {{ [key: string]: CSSValue | CSSValue[], detail: { [key: string]: CSSValue[] } }} CSSSelectorSource */
