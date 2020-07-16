import { L_CB, SEMI } from '../../../utils/code-points.js'

import CSSAtRule from './CSSAtRule.js'

import consumeKnownCSSBracketBlock from '../../../utils/consume-known-css-bracket-block.js'
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
	const block = new CSSAtRule({
		name:   null,
		afterName,
		prelude,
		afterPrelude,
		value,
		opener: null,
		closer: null,
	})

	let { token } = tokenizer
	token.parent = block

	// consume the declaration name, otherwise return the declaration
	block.nodes.name = token

	// consume any skippables following the at-rule name
	consumeLeadingWhitespace(tokenizer, afterName, block)

	if (tokenizer.type >= 0) {
		do {
			switch (tokenizer.type) {
				// <;-token>
				case SEMI:
					afterPrelude.push(...prelude.splice(getTrailingSkippableIndex(prelude)))

					token = block.nodes.closer = tokenizer.token
					token.parent = block

					break

				// <{-token>
				case L_CB:
					afterPrelude.push(...prelude.splice(getTrailingSkippableIndex(prelude)))

					// consume a simple block and assign it to the style rule’s block
					consumeKnownCSSBracketBlock(tokenizer, consumer, block)

					break

				// anything else
				default:
					// consume a component value
					// append the returned value to the style rule’s prelude.
					prelude.push(token = consumeNodeFromTokenizer(tokenizer))
					token.parent = block

					continue
			}

			break
		} while (
			tokenizer()
		)
	}

	return block
}
