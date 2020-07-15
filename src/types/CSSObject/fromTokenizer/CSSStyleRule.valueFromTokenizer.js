import { SEMI, R_CB } from '../../../utils/code-points.js'
import { ATWORD_TYPE, WORD_TYPE } from '../../../utils/node-types.js'
import { createInnerTokenizer } from '../../../utils/iterators.js'

import cssAtRuleFromTokenizer from './CSSAtRule.fromTokenizer.js'
import cssDeclarationFromTokenizer from './CSSDeclaration.fromTokenizer.js'
import CSSTokenFromTokenizer from '../CSSBlock.valueFromTokenizer.js'

/**
 * Consume a value within a CSSStyleRule
 * @param {*} tokenizer
 */
export default function valueFromTokenizer(tokenizer) {
	let declarationTokenizer
	let element

	switch (tokenizer.type) {
		// <atword-token>
		case ATWORD_TYPE:
			return cssAtRuleFromTokenizer(tokenizer, valueFromTokenizer)

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

			element = cssDeclarationFromTokenizer(declarationTokenizer())

			if (tokenizer.type === SEMI) element.nodes.closer = tokenizer.node
			else ++tokenizer.hold

			return element

		// ...
		default:
			return CSSTokenFromTokenizer(tokenizer)
	}
}
