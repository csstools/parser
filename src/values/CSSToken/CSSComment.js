import { COMMENT_TYPE } from '../../utils/token-types.js'
import { defineClass, toConcatenatedString } from '../CSSValue.utils.js'
import { closingOfComment, emptyString, openingOfComment } from '../../utils/string-values.js'
import CSSToken from '../CSSToken.js'

/**
 * ## CSSComment
 *
 * The CSSComment class is the token object for all comments in CSS.
 *
 * @class @extends {CSSToken}
 * @argument {string} value - Content of the comment.
 * @argument {boolean} [isWithoutClosing] - Whether the comment includes closing characters.
 */
export default function CSSComment(value, isWithoutClosing) {
	this.opening = openingOfComment
	this.value = value == null ? emptyString : String(value)
	this.closing = isWithoutClosing ? emptyString : closingOfComment
}

defineClass(`CSSComment`, CSSComment, CSSToken, {
	isSkippish: [ 2, true ],
	type:       [ 2, COMMENT_TYPE ],

	// Methods
	toString: [ 6, function toString() {
		return toConcatenatedString(
			this.opening,
			this.value,
			this.closing
		)
	} ],
})
