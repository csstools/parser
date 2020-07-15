/**
 * Consume a fragment
 * @arg {Function} tokenizer
 * @arg {Function} [consumer] - Function consuming the tokenizer.
 * @arg {Function} [CSSContainer] - Class assigned consumed nodes.
 * @return {CSSFragment}
 */
export default function fromTokenizer(tokenizer, consumer, CSSContainer) {
	const value = []
	const element = new CSSContainer({ value })

	while (tokenizer()) value.push(consumer(tokenizer))

	return element
}
