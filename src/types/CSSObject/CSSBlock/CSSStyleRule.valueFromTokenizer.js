import createInnerTokenizer from '../../../utils/create-inner-tokenizer.js'
import { SEMI, R_CB } from '../../../utils/code-points.js'
import { ATWORD_TYPE, WORD_TYPE } from '../../../utils/token-types.js'

import consumeCSSAtRule from './CSSAtRule.fromTokenizer.js'
import consumeCSSDeclaration from './CSSDeclaration.fromTokenizer.js'
import consumeCSSBlockValue from '../CSSBlock.valueFromTokenizer.js'

/**
 * Consume a value within a CSSStyleRule
 * @param {*} tokenizer
 */
export default function valueFromTokenizer(tokenizer) {
	let declarationTokenizer
	let element
	let token

	switch (tokenizer.type) {
		// <atword-token>
		case ATWORD_TYPE:
			return consumeCSSAtRule(tokenizer, valueFromTokenizer)

		// <word-token>
		case WORD_TYPE:
			declarationTokenizer = createInnerTokenizer(tokenizer)

			do {
				if (
					tokenizer.type === SEMI
					|| tokenizer.type === R_CB
				) break

				declarationTokenizer.consume()
			} while (
				tokenizer()
			)

			element = consumeCSSDeclaration(declarationTokenizer())

			if (tokenizer.type === SEMI) {
				token = element.nodes.closer = tokenizer.token
				token.parent = element
			} else ++tokenizer.hold

			return element

		// ...
		default:
			return consumeCSSBlockValue(tokenizer)
	}
}
