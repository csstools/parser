import { ATWORD_TYPE } from '../../utils/token-types.js'
import { defineClass, toConcatenatedString } from '../CSSValue.utils.js'
import { doubleDashes, symbolOfAtWord } from '../../utils/string-values.js'
import CSSToken from '../CSSToken.js'

/**
 * ## CSSAtWord
 *
 * The CSSAtWord class is the token object for all at-prefixed word in CSS.
 *
 * @class @extends {CSSToken}
 * @argument {string} value - Value of the at-prefixed word.
 */
export default function CSSAtWord(value) {
	this.symbol = symbolOfAtWord
	this.value = value == null ? doubleDashes : String(value)
}

defineClass(`CSSAtWord`, CSSAtWord, CSSToken, {
	type: [ 2, ATWORD_TYPE ],

	// Methods
	toString: [ 6, function toString() {
		return toConcatenatedString(
			this.symbol,
			this.value
		)
	} ],
})
