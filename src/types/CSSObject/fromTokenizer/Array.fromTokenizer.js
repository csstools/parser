/**
 * Return an list of nodes from a tokenizer parsed by a consumer.
 * @arg {Function} tokenizer
 * @arg {Function} consumer
 * @return {unknown[]}
 */
export default function fromTokenizer(tokenizer, consumer, ...consumers) {
	if (!tokenizer.item) tokenizer()
	if (!tokenizer.item) return null

	const array = []

	do {
		array.push(consumer(tokenizer, ...consumers))
	} while (tokenizer().item)

	return array
}
