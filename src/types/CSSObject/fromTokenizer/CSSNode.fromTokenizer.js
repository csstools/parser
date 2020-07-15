import { L_CB, L_SB, L_RB } from '../../../utils/code-points.js'
import { FUNCTION_TYPE } from '../../../utils/node-types.js'

import functionFromTokenizer from './CSSFunction.fromTokenizer.js'
import blockFromTokenizer from './CSSBlock.fromTokenizer.js'

/**
 * Consume a node
 * @see https://drafts.csswg.org/css-syntax/#consume-a-component-value
 */
export default function fromTokenizer(tokenizer) {
	switch (tokenizer.type) {
		// <{-token>, <[-token>, or <(-token>
		case L_RB:
		case L_SB:
		case L_CB:
			// consume a simple block and return it
			return blockFromTokenizer(tokenizer, fromTokenizer)

		// <function-token>
		case FUNCTION_TYPE:
			// consume a function and return it.
			return functionFromTokenizer(tokenizer)

		// anything else
		default:
			return tokenizer.node
	}
}
