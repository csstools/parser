import { closing, closingType, defineClass, opening, openingType, toConcatenatedValues, toJSONObject, toValueString } from '../CSSValue.utils.js'
import CSSGroup from '../CSSGroup.js'

/**
 * CSSBlock
 * @class @extends CSSGroup
 */
export default function CSSBlock(raw) {
	this.raw = Object(raw)
}

defineClass(`CSSBlock`, CSSBlock, CSSGroup, {
	/* CSSBlock {
		opening: String(this.raw.opening)
		value: String(this.raw.value)
		values: Array(this.raw.values)
		closing: String(this.raw.closing)
		raw: {
			opening?: CSSValue
			value?: CSSValue[]
			closing?: CSSValue
		}
	} */

	// Methods
	toJSON: [ 6, function toJSON() {
		const { raw } = this

		return {
			constructor: this.constructor.name,
			opening:     toValueString(raw.opening),
			values:      toJSONObject(raw.values),
			closing:     toValueString(raw.closing),
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
	opening:     [ 11, opening ],
	openingType: [ 10, openingType ],
	closing:     [ 11, closing ],
	closingType: [ 10, closingType ],
})
