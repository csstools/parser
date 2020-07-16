import { COMMENT_TYPE, SPACE_TYPE } from './token-types.js'

/**
 * Consume leading skippable tokens and put them into the specified token list.
 * @arg {Function} tokenizer
 * @arg {import('../types/CSSObject/CSSToken.js')[]} listOfTokens
 */
export default function consumeLeadingWhitespace(tokenizer, listOfTokens, parent) {
	let token

	// consume any skippable nodes following the at-rule name
	while (tokenizer()) {
		switch (tokenizer.type) {
			case COMMENT_TYPE:
			case SPACE_TYPE:
				listOfTokens.push(token = tokenizer.token)
				token.parent = parent

				continue
		}

		break
	}
}
