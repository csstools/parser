import { defineClass, toConcatenatedString, toConcatenatedValues } from './CSSValue.utils.js'
import CSSBlock from './CSSBlock.js'

/**
 *
 * ## CSSFunction
 *
 * The CSSFunction class is the container object for functions in CSS.
 *
 * @class @extends {CSSBlock}
 * @argument {CSSFunctionItems} [items]
 */
export default function CSSFunction(items) {
	this.items = Object(items)
}

defineClass(`CSSFunction`, CSSFunction, CSSBlock, {
	// Methods
	toString: [ 6, function toString() {
		return toConcatenatedString(
			this.items.opening,
			this.items.value,
			this.items.closing
		)
	} ],
	toValues: [ 6, function toValues() {
		return toConcatenatedValues(
			this.items.opening,
			this.items.value,
			this.items.closing
		)
	} ],
})

/** @typedef {import("./CSSValue.js")} CSSValue */
/** @typedef {{ [key: string]: CSSValue | CSSValue[], detail: { [key: string]: CSSValue[] } }} CSSFunctionItems */
