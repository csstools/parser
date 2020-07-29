import { closing, closingType, defineClass, openingType, toConcatenatedValues, toSymbolString, toValueString, values } from '../CSSValue.utils.js'
import CSSGroup from '../CSSGroup.js'

/**
 *
 * ## CSSFunction
 *
 * The CSSFunction class is the container object for functions in CSS.
 *
 * @class @extends {CSSBlock}
 */
export default function CSSFunction(raw) {
	this.raw = Object(raw)
}

defineClass(`CSSFunction`, CSSFunction, CSSGroup, {
	/* CSSFunction {
		name: toValueString(this.raw.opening)
		value: String(this.raw.value)
		values: Array(this.raw.values)
		opening: toSymbolString(this.raw.opening)
		closing: toValueString(this.raw.closing)
		raw: {
			opening?: this.raw.name
			value?: CSSValue[]
			closing?: CSSValue
		}
	} */

	// Methods
	toJSON: [ 6, function toJSON() {
		return {
			constructor: this.constructor.name,
			name:        this.name,
			value:       this.values,
		}
	} ],
	toValues: [ 6, function toValues() {
		const { raw } = this
		return toConcatenatedValues(
			raw.opening,
			raw.value,
			raw.closing
		)
	} ],

	// Accessors
	name:        [ 11, name ],
	opening:     [ 11, opening ],
	openingType: [ 10, openingType ],
	closing:     [ 11, closing ],
	closingType: [ 10, closingType ],
})

function name() {
	return this.raw.opening
}

function opening() {
	return toSymbolString(this.raw.opening)
}

/** @typedef {import("./CSSValue.js")} CSSValue */
/** @typedef {{ [key: string]: CSSValue | CSSValue[], detail: { [key: string]: CSSValue[] } }} CSSFunctionItems */
