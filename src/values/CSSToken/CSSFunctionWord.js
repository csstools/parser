import { FUNCTION_TYPE } from '../../utils/token-types.js'
import { defineClass, toConcatenatedString } from '../CSSValue.utils.js'
import { doubleDashes, symbolOfFunction } from '../../utils/string-values.js'
import CSSToken from '../CSSToken.js'

/**
 * ## CSSFunctionWord
 *
 * The CSSFunctionWord class is the token object for all function words in CSS.
 *
 * @class @extends {CSSToken}
 * @argument {string} value - Name of the function.
 */
export default function CSSFunctionWord(value) {
	this.value = value == null ? doubleDashes : String(value)
	this.symbol = symbolOfFunction
}

defineClass(`CSSFunctionWord`, CSSFunctionWord, CSSToken, {
	type: [ 2, FUNCTION_TYPE ],

	// Methods
	toString: [ 6, function toString() {
		return toConcatenatedString(
			this.value,
			this.symbol
		)
	} ],
})
