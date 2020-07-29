import { defineClass } from '../CSSValue.utils.js'
import { doubleDashes } from '../../utils/string-values.js'
import { WORD_TYPE } from '../../utils/token-types.js'
import CSSToken from '../CSSToken.js'

/**
 * ## CSSWord
 *
 * The CSSWord class is the token object for all named words in CSS.
 *
 * @class @extends {CSSToken}
 */
export default function CSSWord(value) {
	this.value = value == null ? doubleDashes : String(value)
}

defineClass(`CSSWord`, CSSWord, CSSToken, {
	type: [ 2, WORD_TYPE ],
})
