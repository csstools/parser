export default function createInnerTokenizer(tokenizer) {
	const innerBuffer = []
	let innerLength = 0

	innerTokenizer.consume = consume

	return innerTokenizer

	// eslint-disable-next-line no-unused-vars
	function innerTokenizer() {
		if (innerLength === 0) {
			innerTokenizer.type = -1
			innerTokenizer.token = null

			return false
		}

		innerTokenizer.type = innerBuffer.shift()
		innerTokenizer.token = innerBuffer.shift()

		innerLength = innerBuffer.length

		return innerTokenizer
	}

	function consume() {
		innerLength = innerBuffer.push(
			tokenizer.type,
			tokenizer.token
		)
	}
}
