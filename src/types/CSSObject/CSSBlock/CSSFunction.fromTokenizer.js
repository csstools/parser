import CSSFunction from './CSSFunction.js'

import consumeCSSBracketBlock from './CSSBracketBlock.knownFromTokenizer.js'

/**
 * Consume a function
 * @see https://drafts.csswg.org/css-syntax/#consume-a-function
 */
export default function fromTokenizer(tokenizer, consumer) {
	return consumeCSSBracketBlock(tokenizer, consumer, new CSSFunction({
		opener: null,
		value:  [],
		closer: null,
	}))
}
