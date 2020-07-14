import CSSRoot from '../CSSHost/CSSRoot.js'

import consumeRootValueFromTokenizer from './CSSRoot.value.fromTokenizer.js'

/**
 * Consume a block
 * @see https://drafts.csswg.org/css-syntax/#consume-a-simple-block
 * @arg {Function} tokenizer
 * @arg {Function} [consumer]
 */
export default function fromTokenizer(tokenizer) {
	if (!tokenizer.item) tokenizer()
	if (!tokenizer.item) return null

	const element = new CSSRoot()
	const { nodes } = element
	const { value } = nodes

	// Repeatedly consume the next input token and process it as follows:
	do {
		value.push(
			consumeRootValueFromTokenizer(tokenizer)
		)
	} while (tokenizer().item)

	// return the style rule
	return element
}
