import { L_CB } from '../../../utils/code-points.js'

import CSSStyleRule from './CSSStyleRule.js'

import consumeCSSBracketBlock from './CSSBracketBlock.knownFromTokenizer.js'
import consumeCSSBlockValue from '../CSSBlock.valueFromTokenizer.js'
import consumeCSSStyleRule from './CSSStyleRule.valueFromTokenizer.js'

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
				element.nodes.opener = tokenizer.node

				consumeCSSBracketBlock(tokenizer, consumeCSSStyleRule, element)

				break

			// anything else
			default:
				// consume a component value
				// append the returned value to the style rule’s prelude.
				prelude.push(
					consumeCSSBlockValue(tokenizer)
				)

				continue
		}

		break
	} while (tokenizer())

	// return the style rule
	return element
}
