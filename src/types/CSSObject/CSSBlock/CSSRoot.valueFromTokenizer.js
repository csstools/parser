import { COMMENT_TYPE, SPACE_TYPE, ATWORD_TYPE } from '../../../utils/node-types.js'

import consumeCSSAtRule from './CSSAtRule.fromTokenizer.js'
import consumeCSSStyleRule from './CSSStyleRule.fromTokenizer.js'

/**
 * Consume a CSSRoot value.
 * @param {Function} tokenizer
 */
export default function valueFromTokenizer(tokenizer) {
	// Repeatedly consume the next input token and process it as follows:
	switch (tokenizer.type) {
		// <css-comment>
		// <css-space>
		case COMMENT_TYPE:
		case SPACE_TYPE:
			return tokenizer.node

		// <css-atword>
		case ATWORD_TYPE:
			// consume a component value and append it to the value of the block
			return consumeCSSAtRule(tokenizer, valueFromTokenizer)

		// anything else
		default:
			// consume a component value and append it to the value of the block
			return consumeCSSStyleRule(tokenizer)
	}
}
