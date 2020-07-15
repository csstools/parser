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
	innerTokenizer.input = tokenizer.input

	// eslint-disable-next-line prefer-destructuring
	innerTokenizer[0] = tokenizer[0]

	return innerTokenizer

	// eslint-disable-next-line no-unused-vars
	function innerTokenizer($0, $1, $2, $3, $4, $5) {
		if (innerLength === 0) {
			innerTokenizer.type = -1

			return false
		}

		innerTokenizer.type = innerBuffer.shift()

		const args = innerBuffer.shift()

		/* eslint-disable prefer-destructuring */
		innerTokenizer[1] = args[0]
		innerTokenizer[2] = args[1]
		innerTokenizer[3] = args[2]
		innerTokenizer[4] = args[3]
		innerTokenizer[5] = args[4]
		/* eslint-enable prefer-destructuring */

		--innerLength
		--innerLength

		return true
	}

	function consume() {
		innerLength = innerBuffer.push(
			tokenizer.type,
			Array.prototype.slice.call(tokenizer, 1)
		)
	}
}
