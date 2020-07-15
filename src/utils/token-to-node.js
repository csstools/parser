/* Token Identifiers */
import {
	ATWORD_TYPE,
	COMMENT_TYPE,
	FUNCTION_TYPE,
	HASH_TYPE,
	NUMBER_TYPE,
	SPACE_TYPE,
	STRING_TYPE,
	WORD_TYPE,
} from './node-types.js'

import CSSAtWord from '../types/CSSObject/CSSToken/CSSAtWord.js'
import CSSComment from '../types/CSSObject/CSSToken/CSSComment.js'
import CSSFunctionToken from '../types/CSSObject/CSSToken/CSSFunctionToken.js'
import CSSHash from '../types/CSSObject/CSSToken/CSSHash.js'
import CSSNumber from '../types/CSSObject/CSSToken/CSSNumber.js'
import CSSSpace from '../types/CSSObject/CSSToken/CSSSpace.js'
import CSSString from '../types/CSSObject/CSSToken/CSSString.js'
import CSSWord from '../types/CSSObject/CSSToken/CSSWord.js'
import CSSSymbol from '../types/CSSObject/CSSToken/CSSSymbol.js'

export default function tokenToNode(text, open, shut, lead, tail, position) {
	switch (this.type) {
		case ATWORD_TYPE:
			return new CSSAtWord({
				symbol: `@`,
				value:  text.slice(open + 1, shut),
				source: {
					input: this.input,
					position,
				},
			})
		case COMMENT_TYPE:
			return new CSSComment({
				opener: `/*`,
				value:  text.slice(open + lead, shut - tail),
				closer: tail ? `*/` : ``,
				source: {
					input: this.input,
					position,
				},
			})
		case FUNCTION_TYPE:
			return new CSSFunctionToken({
				value:  text.slice(open, shut - tail),
				symbol: `(`,
				source: {
					input: this.input,
					position,
				},
			})
		case HASH_TYPE:
			return new CSSHash({
				symbol: `#`,
				value:  text.slice(open + 1, shut),
				source: {
					input: this.input,
					position,
				},
			})
		case NUMBER_TYPE:
			return new CSSNumber({
				value:  text.slice(open, shut - tail),
				unit:   tail ? text.slice(shut - tail, shut) : ``,
				source: {
					input: this.input,
					position,
				},
			})
		case SPACE_TYPE:
			return new CSSSpace({
				value:  text.slice(open, shut),
				source: {
					input: this.input,
					position,
				},
			})
		case STRING_TYPE:
			return new CSSString({
				opener: text[open],
				value:  text.slice(open + 1, shut - 1),
				closer: tail ? text[open] : ``,
				source: {
					input: this.input,
					position,
				},
			})
		case WORD_TYPE:
			return new CSSWord({
				value:  text.slice(open, shut),
				source: {
					input: this.input,
					position,
				},
			})
		default:
			return new CSSSymbol({
				value:  text[open],
				source: {
					input: this.input,
					position,
				},
			})
	}
}
