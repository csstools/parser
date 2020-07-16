import RofL from './variants.js'

/**
 * Consume a known bracketed block.
 * @see https://drafts.csswg.org/css-syntax/#consume-a-simple-block
 * @arg {Function} tokenizer - Tokenizer to be consumed.
 * @arg {Function} consumer - Consumer of the Tokenizer.
 * @arg {Function} element - Element to receive the consumed nodes.
 */
export default function consumeKnownCSSBracketBlock(tokenizer, consumer, element) {
	const { nodes } = element
	const { value } = nodes

	let { token } = tokenizer
	nodes.opener = token
	token.parent = element

	/** @type {number} End of Block */
	const END_OF_BLOCK = RofL[tokenizer.type]

	while (tokenizer()) {
		if (tokenizer.type === END_OF_BLOCK) {
			token = nodes.closer = tokenizer.token
			token.parent = element

			break
		}

		value.push(token = consumer(tokenizer))
		token.parent = element
	}

	return element
}
