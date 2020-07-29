import { NUMBER_TYPE } from '../../utils/token-types.js'
import { defineClass, toConcatenatedString } from '../CSSValue.utils.js'
import { emptyString, zero } from '../../utils/string-values.js'
import CSSToken from '../CSSToken.js'

/**
 * ## CSSNumber
 *
 * The CSSNumber class is the token object for all numeric values in CSS.
 *
 * @class @extends {CSSToken}
 * @argument {string} value - Value of the number.
 * @argument {string} [unit] - Unit of the number.
 */
export default function CSSNumber(value, unit) {
	this.value = value == null ? zero : String(value)
	this.unit = unit == null ? emptyString : String(unit)
}

defineClass(`CSSNumber`, CSSNumber, CSSToken, {
	type: [ 2, NUMBER_TYPE ],

	// Methods
	toString: [ 6, function toString() {
		return toConcatenatedString(
			this.value,
			this.unit
		)
	} ],
})
