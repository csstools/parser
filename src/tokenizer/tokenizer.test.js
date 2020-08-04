import * as is from '../shared/code-points.js'
import * as um from '../shared/definitions.js'

export default function tokenizer(/** @type {number} */ data) {
	const size = data.length
	let cpm2 = is.EOF
	let cpm1 = is.EOF
	let cpp0 = data.charCodeAt(0)
	let cpp1 = data.charCodeAt(1)
	let cpp2 = data.charCodeAt(2)
	let open = 0
	let shut = 0
	read.charCodeAt = data.charCodeAt.bind(data)
	return read
	function read() {
		if (shut === size) return false
		open = shut
		switch (true) {
			case isCommentStart(cpp0, cpp1):
				step()
				step()
				step()
				console.log({ type: `comment`, open, shut, text: data.slice(open, shut) })
				break
			case um.isSpace(cpp0):
				consumeSpaceToken(read, step, back, shut, size)
				console.log({ type: `space  `, open, shut, text: data.slice(open, shut) })
				break
			case um.isIdentifierStart(cpp0):
				consumeIdentifierToken(read, step, back, shut, size)
				console.log({ type: `ident  `, open, shut, text: data.slice(open, shut) })
				break
			case isAtIdentifierStart(read, step, back, shut, size):
			default:
				step()
				console.log({ type: `symbol `, open, shut, text: data.slice(open, shut) })
				break
		}
		return true
	}
	function step() {
		cpm2 = cpm1
		cpm1 = cpp0
		cpp0 = cpp1
		cpp1 = cpp2
		cpp2 = data.charCodeAt(shut + 3)
		++shut
		return cpp0
	}
	function back() {
		cpp2 = cpp1
		cpp1 = cpp0
		cpp0 = cpm1
		cpm1 = cpm2
		cpm2 = is.EOF
		--shut
		return cpp0
	}
}

function isHyperMinus(code) {
	return code === is.HYPHEN_MINUS
}

function isCommentStart(cpp0, cpp1) {
	return cpp0 === is.SOLIDUS && cpp1 === is.ASTERISK
}

function isSpace(code) {
	return (
		code === is.CHARACTER_TABULATION
		|| code === is.LINE_FEED
		|| code === is.FORM_FEED
		|| code === is.CARRIAGE_RETURN
		|| code === is.SPACE
	)
}

function consumeSpaceToken(read, step, back, spot, size) {
	do {
		if (isSpace(step())) continue
		break
	} while (spot < size)
}

function consumeIdentifierToken(read, step, back, spot, size) {
	do {
		if (um.isIdentifier(step())) continue
		break
	} while (spot < size)
}

function isAtIdentifierStart(read, step, back, shut, size) {
	switch (true) {
		case isHyperMinus(read.cpp0):
			step()
			if (
				um.isIdentifierStart(read.cpp0)
				|| isHyperMinus(read.cpp0)
			) {
				step()
				return true
			}

			return isValidEscape(read, step, back, shut, size)
		case um.isIdentifierStart(code):
			read.shut = mark + 1
			return true
		case isValidEscape(read, code, mark + 1):
			read.shut = mark + 2
			return true
	}
	return false
}

function isValidEscape(read, code, mark) {
	return (
		code === REVERSE_SOLIDUS
		&& isNewLine(read.charCodeAt(mark + 1))
	)
}

const play = tokenizer(`hiya   @word`)

while (play()) continue
