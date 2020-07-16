import { L_CB } from '../../../utils/code-points.js'

import CSSStyleRule from './CSSStyleRule.js'

import consumeKnownCSSBracketBlock from '../../../utils/consume-known-css-bracket-block.js'
import consumeCSSBlockValue from '../CSSBlock.valueFromTokenizer.js'
import consumeCSSStyleRule from './CSSStyleRule.valueFromTokenizer.js'

import getTrailingSkippableIndex from '../../../utils/get-trailing-skippable-index.js'

/**
 * Consume a style rule
 * @see https://drafts.csswg.org/css-syntax/#consume-a-qualified-rule
 */
export default function fromTokenizer(tokenizer) {
	// create an empty declaration
	const prelude = []
	const afterPrelude = []
	const value   = []
	const block = new CSSStyleRule({
		prelude,
		afterPrelude,
		opener: null,
		value,
		closer: null,
	})

	let token

	do {
		switch (tokenizer.type) {
			// <{-token>
			case L_CB:
				afterPrelude.push(...prelude.splice(getTrailingSkippableIndex(prelude)))

				// consume a simple block and assign it to the style rule’s block
				consumeKnownCSSBracketBlock(tokenizer, consumeCSSStyleRule, block)

				break

			// anything else
			default:
				// consume a component value
				// append the returned value to the style rule’s prelude.
				prelude.push(token = consumeCSSBlockValue(tokenizer))
				token.parent = block

				continue
		}

		break
	} while (tokenizer())

	// return the style rule
	return block
}
