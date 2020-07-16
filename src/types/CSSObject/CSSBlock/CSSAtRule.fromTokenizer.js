import { L_CB, SEMI } from '../../../utils/code-points.js'

import CSSAtRule from './CSSAtRule.js'

import consumeKnownCSSBracketBlock from '../../../utils/consumeKnownCSSBracketBlock.js'
import consumeNodeFromTokenizer from '../CSSBlock.valueFromTokenizer.js'
import getTrailingSkippableIndex from '../../../utils/get-trailing-skippable-index.js'
import consumeLeadingWhitespace from '../../../utils/consume-leading-skippables.js'

/**
 * Consume an at-rule from a tokenizer
 * @see https://drafts.csswg.org/css-syntax/#consume-a-qualified-rule
 */
export default function fromTokenizer(tokenizer, consumer) {
	// create an empty declaration
	const afterName = []
	const prelude = []
	const afterPrelude = []
	const value = []
	const element = new CSSAtRule({
		name:   null,
		afterName,
		prelude,
		afterPrelude,
		value,
		opener: null,
		closer: null,
	})

	// consume the declaration name, otherwise return the declaration
	element.nodes.name = tokenizer.token

	// consume any skippables following the at-rule name
	consumeLeadingWhitespace(tokenizer, afterName)

	if (tokenizer.type >= 0) {
		do {
			switch (tokenizer.type) {
				// <;-token>
				case SEMI:
					afterPrelude.push(...prelude.splice(getTrailingSkippableIndex(prelude)))
					element.nodes.closer = tokenizer.token

					break

				// <{-token>
				case L_CB:
					afterPrelude.push(...prelude.splice(getTrailingSkippableIndex(prelude)))

					// consume a simple block and assign it to the style rule’s block
					consumeKnownCSSBracketBlock(tokenizer, consumer, element)

					break

				// anything else
				default:
					// consume a component value
					// append the returned value to the style rule’s prelude.
					prelude.push(
						consumeNodeFromTokenizer(tokenizer)
					)

					continue
			}

			break
		} while (
			tokenizer()
		)
	}

	return element
}
