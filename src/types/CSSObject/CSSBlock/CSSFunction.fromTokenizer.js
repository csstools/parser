import CSSFunction from './CSSFunction.js'

import consumeKnownCSSBracketBlock from '../../../utils/consume-known-css-bracket-block.js'

/**
 * Consume a function
 * @see https://drafts.csswg.org/css-syntax/#consume-a-function
 */
export default function fromTokenizer(tokenizer, consumer) {
	return consumeKnownCSSBracketBlock(tokenizer, consumer, new CSSFunction({
		opener: null,
		value:  [],
		closer: null,
	}))
}
