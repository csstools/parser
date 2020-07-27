import { defineClass } from './CSSValue.utils.js'
import { doubleDashes } from '../tokenize.strings.js'
import { WORD_TYPE } from '../token-types.js'
import CSSToken from './CSSToken.js'

/**
 * ## CSSWord
 *
 * The CSSWord class is the token object for all named words in CSS.
 *
 * @class @extends {CSSToken}
 * @argument {string} value - Value of the word.
 */
export default function CSSWord(value) {
	this.value = value == null ? doubleDashes : String(value)
}

defineClass(`CSSWord`, CSSWord, CSSToken, {
	type: [ 2, WORD_TYPE ],
})
