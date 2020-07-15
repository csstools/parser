export function createIterator(pull) {
	next.item = undefined

	next.hold = 0

	return next

	function next() {
		if (next.hold) --next.hold
		else next.item = pull.apply(this, arguments)

		return !!next.item
	}
}

export function createArrayIterator() {
	const list = []
	const next = createIterator(list.shift.bind(list))

	next.push = list.push.bind(list)

	return next
}

export function createInnerTokenizer(tokenizer) {
	const innerBuffer = []
	let innerLength = 0

	innerTokenizer.consume = consume

	return innerTokenizer

	// eslint-disable-next-line no-unused-vars
	function innerTokenizer() {
		if (innerLength === 0) {
			innerTokenizer.type = -1
			innerTokenizer.node = null

			return false
		}

		innerTokenizer.type = innerBuffer.shift()
		innerTokenizer.node = innerBuffer.shift()

		innerLength = innerBuffer.length

		return true
	}

	function consume() {
		innerLength = innerBuffer.push(
			tokenizer.type,
			tokenizer.node
		)
	}
}
