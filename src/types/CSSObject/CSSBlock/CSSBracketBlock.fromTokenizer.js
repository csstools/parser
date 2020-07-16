import CSSBracketBlock from './CSSBracketBlock.js'

import consumeKnownCSSBracketBlock from '../../../utils/consume-known-css-bracket-block.js'

/**
 * Consume a bracket block.
 * @see https://drafts.csswg.org/css-syntax/#consume-a-function
 */
export default function fromTokenizer(tokenizer, consumer) {
	return consumeKnownCSSBracketBlock(tokenizer, consumer, new CSSBracketBlock({
		opener: null,
		value:  [],
		closer: null,
	}))
}
