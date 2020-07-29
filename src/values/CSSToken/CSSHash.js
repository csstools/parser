import { HASH_TYPE } from '../../utils/token-types.js'
import { defineClass, toConcatenatedString } from '../CSSValue.utils.js'
import { doubleDashes, symbolOfHash } from '../../utils/string-values.js'
import CSSToken from '../CSSToken.js'

/**
 * ## CSSHash
 *
 * The CSSHash class is the token object for all hashes in CSS.
 *
 * @class @extends {CSSToken}
 * @argument {string} value - Value of the hash.
 */
export default function CSSHash(value) {
	this.symbol = symbolOfHash
	this.value = value == null ? doubleDashes : String(value)
}

defineClass(`CSSHash`, CSSHash, CSSToken, {
	type: [ 2, HASH_TYPE ],

	// Methods
	toString: [ 6, function toString() {
		return toConcatenatedString(
			this.symbol,
			this.value
		)
	} ],
})
