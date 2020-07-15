import { RofL } from '../../../utils/code-points.js'

import CSSBlock from '../CSSHost/CSSBlock.js'

/**
 * Consume a block
 * @see https://drafts.csswg.org/css-syntax/#consume-a-simple-block
 * @arg {Function} tokenizer
 */
export default function fromTokenizer(tokenizer, consumer) {
	const element = new CSSBlock()
	const { opener, value, closer } = element.nodes

	opener.push(tokenizer.node)

	/** @type {number} End of Block */
	const EOB = RofL[tokenizer.type]

	while (tokenizer()) {
		if (tokenizer.type === EOB) {
			closer.push(tokenizer.node)

			break
		}

		value.push(consumer(tokenizer))

		continue
	}

	return element
}
