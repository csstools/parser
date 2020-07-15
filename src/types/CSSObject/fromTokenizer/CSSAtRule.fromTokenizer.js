import { L_CB, SEMI } from '../../../utils/code-points.js'

import CSSAtRule from '../CSSHost/CSSAtRule.js'

import consumeBlockFromTokenizer from './CSSBlock.fromTokenizer.js'
import consumeNodeFromTokenizer from './CSSNode.fromTokenizer.js'
import getTrailingSkippableIndex from '../../../utils/getTrailingSkippableIndex.js'
import consumeLeadingWhitespace from '../../../utils/consumeLeadingWhitespace.js'
import tokenToNode from '../../../utils/token-to-node.js'

/**
 * Consume an at-rule from a tokenizer
 * @see https://drafts.csswg.org/css-syntax/#consume-a-qualified-rule
 */
export default function fromTokenizer(tokenizer, consumer) {
	// create an empty declaration
	const element = new CSSAtRule()
	const { name, afterName, prelude, afterPrelude, value } = element.nodes

	// consume the declaration name, otherwise return the declaration
	name.push(tokenToNode.apply(tokenizer, tokenizer))

	// consume any skippables following the at-rule name
	consumeLeadingWhitespace(tokenizer, afterName)

	if (tokenizer.type >= 0) {
		do {
			switch (tokenizer.type) {
				// <{-token>
				case SEMI:
					afterPrelude.push(...prelude.splice(getTrailingSkippableIndex(prelude)))
					afterPrelude.push(tokenToNode.apply(tokenizer, tokenizer))

					break

				// <{-token>
				case L_CB:
					afterPrelude.push(...prelude.splice(getTrailingSkippableIndex(prelude)))

					// consume a simple block and assign it to the style rule’s block
					value.push(
						consumeBlockFromTokenizer(tokenizer, consumer)
					)

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
		} while (tokenizer())
	}

	return element
}
