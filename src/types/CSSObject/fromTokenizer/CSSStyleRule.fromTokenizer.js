import { L_CB, SEMI, R_CB } from '../../../utils/code-points.js'
import { ATWORD_TYPE, WORD_TYPE } from '../../../utils/node-types.js'
import { createInnerTokenizer } from '../../../utils/iterators.js'

import CSSStyleRule from '../CSSHost/CSSStyleRule.js'

import consumeAtStyleRuleFromTokenizer from './CSSAtRule.fromTokenizer.js'
import blockFromTokenizer from './CSSBlock.fromTokenizer.js'
import declarationFromTokenizer from './CSSDeclaration.fromTokenizer.js'
import nodeFromTokenizer from './CSSNode.fromTokenizer.js'

import getTrailingSkippableIndex from '../../../utils/getTrailingSkippableIndex.js'

/**
 * Consume a style rule
 * @see https://drafts.csswg.org/css-syntax/#consume-a-qualified-rule
 */
export default function fromTokenizer(tokenizer) {
	// create an empty declaration
	const prelude = []
	const afterPrelude = []
	const value   = []
	const element = new CSSStyleRule({
		prelude,
		afterPrelude,
		opener: null,
		value,
		closer: null,
	})

	do {
		switch (tokenizer.type) {
			// <{-token>
			case L_CB:
				afterPrelude.push(...prelude.splice(getTrailingSkippableIndex(prelude)))

				// consume a simple block and assign it to the style rule’s block
				blockFromTokenizer(tokenizer, declarationsFromTokenizer, element)

				break

			// anything else
			default:
				// consume a component value
				// append the returned value to the style rule’s prelude.
				prelude.push(
					nodeFromTokenizer(tokenizer)
				)

				continue
		}

		break
	} while (tokenizer())

	// return the style rule
	return element
}

function declarationsFromTokenizer(tokenizer) {
	let declarationTokenizer
	let element

	switch (tokenizer.type) {
		// ...
		case ATWORD_TYPE:
			return consumeAtStyleRuleFromTokenizer(tokenizer, declarationsFromTokenizer)

		// ...
		case WORD_TYPE:
			declarationTokenizer = createInnerTokenizer(tokenizer)

			// ...
			do {
				// ...
				if (
					tokenizer.type === SEMI
					|| tokenizer.type === R_CB
				) break

				// ...
				declarationTokenizer.consume()
			} while (tokenizer())

			declarationTokenizer()

			element = declarationFromTokenizer(declarationTokenizer)

			if (tokenizer.type === SEMI) element.nodes.closer = tokenizer.node
			else ++tokenizer.hold

			return element

		// ...
		default:
			return nodeFromTokenizer(tokenizer)
	}
}
