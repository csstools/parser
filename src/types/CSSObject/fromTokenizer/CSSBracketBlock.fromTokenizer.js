import { RofL } from '../../../utils/code-points.js'

/**
 * Consume a bracketed block.
 * @see https://drafts.csswg.org/css-syntax/#consume-a-simple-block
 * @arg {Function} tokenizer - Tokenizer to be consumed.
 * @arg {Function} consumer - Consumer of the Tokenizer.
 * @arg {Function} element - Element to receive the consumed nodes.
 */
export default function fromTokenizer(tokenizer, consumer, element) {
	const { nodes } = element
	const { value } = nodes

	nodes.opener = tokenizer.node

	/** @type {number} End of Block */
	const END_OF_BLOCK = RofL[tokenizer.type]

	while (
		tokenizer()
	) {
		if (tokenizer.type === END_OF_BLOCK) {
			nodes.closer = tokenizer.node

			break
		}

		value.push(
			consumer(tokenizer)
		)
	}

	return element
}
