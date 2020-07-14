import CSSFragment from '../CSSHost/CSSFragment.js'

import consumeNodeFromTokenizer from './CSSNode.fromTokenizer.js'

/**
 * Consume a fragment
 * @arg {Function} tokenizer
 * @arg {Function} [consumer] - Function consuming the tokenizer.
 * @arg {Function} [CSSContainer] - Class assigned consumed nodes.
 * @return {CSSFragment}
 */
export default function fromTokenizer(tokenizer, consumer, CSSContainer) {
	if (!tokenizer.item) tokenizer()
	if (!tokenizer.item) return null

	consumer = consumer || consumeNodeFromTokenizer
	CSSContainer = CSSContainer || CSSFragment

	const element = new CSSContainer({ nodes: { value: [] } })
	const { value } = element.nodes

	do {
		value.push(consumer(tokenizer))
	} while (tokenizer().item)

	return element
}
