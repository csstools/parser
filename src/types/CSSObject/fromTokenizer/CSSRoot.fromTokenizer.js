import CSSComment from '../CSSNode/CSSComment.js'
import CSSSpace from '../CSSNode/CSSSpace.js'
import CSSAtWord from '../CSSNode/CSSAtWord.js'

import consumeAtRuleFromTokenizer from './CSSAtRule.fromTokenizer.js'
import consumeStyleRuleFromTokenizer from './CSSStyleRule.fromTokenizer.js'

export default function fromTokenizer(tokenizer) {
	if (!tokenizer.item) tokenizer()
	if (!tokenizer.item) return null

	/** @type {CSSNode} Current Node */
	const { item } = tokenizer

	// Repeatedly consume the next input token and process it as follows:
	switch (true) {
		// <css-comment>
		// <css-space>
		case item.constructor === CSSComment:
		case item.constructor === CSSSpace:
			return item

		// anything else
		case item.constructor === CSSAtWord:
			// consume a component value and append it to the value of the block
			return consumeAtRuleFromTokenizer(tokenizer, fromTokenizer)

		// anything else
		default:
			// consume a component value and append it to the value of the block
			return consumeStyleRuleFromTokenizer(tokenizer)
	}
}
