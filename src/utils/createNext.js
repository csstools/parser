export default function createNext(pull) {
	next.item = undefined

	next.hold = 0

	return next

	function next() {
		if (next.hold) --next.hold
		else next.item = pull.apply(this, arguments)

		return next
	}
}

export function createArrayIterator() {
	const list = []
	const next = createNext(list.shift.bind(list))

	next.push = list.push.bind(list)

	return next
}
