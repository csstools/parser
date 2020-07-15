/**
 * Consume a fragment
 * @arg {Function} tokenizer
 * @arg {Function} [consumer] - Function consuming the tokenizer.
 * @arg {Function} [CSSContainer] - Class assigned consumed nodes.
 * @return {CSSFragment}
 */
export default function fromTokenizer(tokenizer, consumer, CSSContainer) {
	const element = new CSSContainer({ nodes: { value: [] } })
	const { value } = element.nodes

	while (tokenizer()) value.push(consumer(tokenizer))

	return element
}
