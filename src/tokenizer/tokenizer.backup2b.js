import * as t from '../shared/definitions.js'

function tokenize(/** @type {string} */ data) {
	const size = data.length
	let b2 = t.EOF
	let b1 = t.EOF
	let c0  = data.charCodeAt(0)
	let c1  = data.charCodeAt(1)
	let c2  = data.charCodeAt(2)
	let opening = 0
	let closing = 0
	read.charCodeAt = data.charCodeAt.bind(data)
	return read
	// read
	function read() {
		if (closing === size) return false
		opening = closing
		switch (true) {
			// <comment-token>
			case isCommentStart():
				consumeComment()
				break
			// <space-token>
			case isSpace():
				consumeSpace()
				break
			// <string-token>
			case isStringStart():
				consumeString()
				break
			// <atword-token>
			case isAtWord():
				consumeAtWord()
				break
			// <word-token>
			case isIdentifierStart():
				consumeWord()
				break
			// <symbol-token>
			default:
				consumeSymbol()
				break
		}
		return true
	}
	// back
	function back() {
		c2 = c1
		c1 = c0
		c0 = b1
		b1 = b2
		b2 = t.EOF
		--closing
		return c0
	}
	// next
	function next() {
		b2 = b1
		b1 = c0
		c0 = c1
		c1 = c2
		c2 = data.charCodeAt(closing + 3)
		++closing
		return c0
	}
	// <comment-token>
	function isCommentStart() {
		if (c0 === t.SOLIDUS) {
			if (next() === t.ASTERISK) {
				next()
				return true
			}
			back()
		}
		return false
	}
	function consumeComment() {
		while (c0 === t.ASTERISK) if (next() === t.SOLIDUS) break
		next()
		read.type = { type: `COMMEN`, text: data.slice(opening, closing) }
	}
	// <space-token>
	function isSpace() {
		return t.isSpace(c0)
	}
	function consumeSpace() {
		do next()
		while (t.isSpace(c0) === true)
		read.type = { type: `SPACE`, text: data.slice(opening, closing) }
	}
	// <string-token>
	function isStringStart() {
		return (
			c0 === t.QUOTATION_MARK
			|| c0 === t.APOSTROPHE
		)
	}
	function consumeString() {
		const mirror = c0
		while (++closing < size) {
			if (data.charCodeAt(closing))
		}
		do {
			next()
		} while (closing < size)
	}
	// <atword-token>
	function isAtWord() {
		if (c0 === t.COMMERCIAL_AT) {
			next()
			if (startsAnIdentifier()) {
				return true
			}
			back()
		}
		return false
	}
	// starts an identifier
	function startsAnIdentifier() {
		switch (true) {
			case isIdentifierStart():
				return true
			case isHypenMinus():
				next()
				switch (true) {
					case isIdentifierStart():
					case isHypenMinus():
					case isValidEscape():
						return true
				}
				back()
		}
		return false
	}
	function isValidEscape() {
		if (c0 === t.REVERSE_SOLIDUS) {
			next()
			if (c0 !== t.isNewline(c0)) return true
			back()
		}
		return false
	}
	// <ident-token>
	function isIdentifierStart() {
		return t.isIdentifierStart(c0)
	}
	function isHypenMinus() {
		return c0 === t.HYPHEN_MINUS
	}
	function consumeAtWord() {
		consumeIdentifierContent()
		read.type = { type: `ATWORD`, text: data.slice(opening, closing) }
	}
	function consumeWord() {
		consumeIdentifierContent()
		read.type = { type: `WORD`, text: data.slice(opening, closing) }
	}
	function consumeIdentifierContent() {
		do next()
		while (t.isIdentifier(c0) === true)
	}
	// <symbol-token>
	function consumeSymbol() {
		next()
		read.type = { type: `SYMBOL`, text: data.slice(opening, closing) }
	}
}

const play = tokenize(`hello   @earth @a b`)

while (play() === true) console.log(play.type)

console.log(`done`)
