import { L_CB } from '../../../utils/code-points.js'

import CSSStyleRule from '../CSSBlock/CSSStyleRule.js'

import cssBlockFromTokenizer from './CSSBracketBlock.fromTokenizer.js'
import CSSTokenFromTokenizer from './CSSBlock.valueFromTokenizer.js'
import cssStyleRuleValueFromTokenizer from './CSSStyleRule.valueFromTokenizer.js'

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
				cssBlockFromTokenizer(tokenizer, cssStyleRuleValueFromTokenizer, element)

				break

			// anything else
			default:
				// consume a component value
				// append the returned value to the style rule’s prelude.
				prelude.push(
					CSSTokenFromTokenizer(tokenizer)
				)

				continue
		}

		break
	} while (tokenizer())

	// return the style rule
	return element
}
