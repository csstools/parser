import { COMMENT_TYPE, SPACE_TYPE, ATWORD_TYPE } from '../../../utils/node-types.js'

import consumeAtRuleFromTokenizer from './CSSAtRule.fromTokenizer.js'
import consumeStyleRuleFromTokenizer from './CSSStyleRule.fromTokenizer.js'

export default function fromTokenizer(tokenizer) {
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
			return consumeAtRuleFromTokenizer(tokenizer, fromTokenizer)

		// anything else
		default:
			// consume a component value and append it to the value of the block
			return consumeStyleRuleFromTokenizer(tokenizer)
	}
}
