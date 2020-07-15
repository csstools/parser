import { RofL } from '../../../utils/code-points.js'

import CSSBlock from '../CSSHost/CSSBlock.js'

import tokenToNode from '../../../utils/token-to-node.js'

/**
 * Consume a block
 * @see https://drafts.csswg.org/css-syntax/#consume-a-simple-block
 * @arg {Function} tokenizer
 */
export default function fromTokenizer(tokenizer, consumer) {
	const element = new CSSBlock()
	const { opener, value, closer } = element.nodes

	opener.push(tokenToNode.apply(tokenizer, tokenizer))

	/** @type {number} End of Block */
	const EOB = RofL[tokenizer.type]

	while (tokenizer()) {
		if (tokenizer.type === EOB) {
			closer.push(tokenToNode.apply(tokenizer, tokenizer))

			break
		}

		value.push(consumer(tokenizer))

		continue
	}

	return element
}
