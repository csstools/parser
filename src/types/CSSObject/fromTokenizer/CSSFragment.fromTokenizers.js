import CSSFragment from '../CSSHost/CSSFragment.js'

import consumeNodeFromTokenizer from './CSSNode.fromTokenizer.js'

/**
 * Consume a block
 * @see https://drafts.csswg.org/css-syntax/#consume-a-simple-block
 * @arg {Function} tokenizer
 * @arg {Function} [consumer] - Consumer which is fed the tokenizer.
 * @arg {Function} [CSSContainer] - Container class given values.
 * @return {CSSFragment}
 */
export default function fromTokenizer(tokenizer, consumer, CSSContainer) {
	if (!tokenizer.item) tokenizer()
	if (!tokenizer.item) return null

	consumer = consumer || consumeNodeFromTokenizer
	CSSContainer = CSSContainer || CSSFragment

	const element = new CSSContainer()
	const { nodes } = element
	const { value } = nodes

	do {
		value.push(consumer(tokenizer))
	} while (tokenizer().item)

	return element
}
