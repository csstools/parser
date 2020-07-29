import { STRING_TYPE } from '../../utils/token-types.js'
import { defineClass, toConcatenatedString } from '../CSSValue.utils.js'
import { edgeOfDQString, emptyString } from '../../utils/string-values.js'
import CSSToken from '../CSSToken.js'

/**
 * ## CSSString
 *
 * The CSSString class is the token object for all strings in CSS.
 *
 * @class @extends {CSSToken}
 * @argument {string} value - Value of the string.
 * @argument {"'" | "\""} [opening] - Quotation mark symbol used to wrap the string.
 * @argument {boolean} [isWithoutClosing] - Whether the string is missing its closing quotation mark.
 */
export default function CSSString(value, opening, isWithoutClosing) {
	this.opening = opening == null ? edgeOfDQString : opening
	this.value = value
	this.closing = isWithoutClosing ? emptyString : this.opening
}

defineClass(`CSSString`, CSSString, CSSToken, {
	type: [ 2, STRING_TYPE ],

	// Methods
	toJSON: [ 6, function toJSON() {
		return {
			isString: true,
			value:    this.value,
		}
	} ],
	toString: [ 6, function toString() {
		return toConcatenatedString(
			this.opening,
			this.value,
			this.closing
		)
	} ],
})
