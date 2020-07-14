import { L_CB, L_SB, L_RB } from '../../../utils/code-points.js'

import CSSFunctionWord from '../CSSNode/CSSFunctionWord.js'

import functionFromTokenizer from './CSSFunction.fromTokenizer.js'
import blockFromTokenizer from './CSSBlock.fromTokenizer.js'

/**
 * Consume a node
 * @see https://drafts.csswg.org/css-syntax/#consume-a-component-value
 */
export default function fromTokenizer(tokenizer) {
	if (!tokenizer.item) tokenizer()
	if (!tokenizer.item) return null

	/** @type {{ item: CSSNode }} Current Node */
	const { item } = tokenizer

	switch (true) {
		// <{-token>, <[-token>, or <(-token>
		case item.code === L_RB:
		case item.code === L_SB:
		case item.code === L_CB:
			// consume a simple block and return it
			return blockFromTokenizer(tokenizer)

		// <function-token>
		case item.constructor === CSSFunctionWord:
			// consume a function and return it.
			return functionFromTokenizer(tokenizer)

		// anything else
		default:
			return item
	}
}

/** @typedef {import('../CSSNode/CSSNode.js')} CSSNode */
