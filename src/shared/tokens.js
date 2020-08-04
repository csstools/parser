import * as cpas from './code-points.js'
import * as defs from './definitions.js'
// import * as algs from './algorithms.js'

export default function tokenize(/** @type {string} */ data) {
	const size = data.length
	let code = cpas.EOF
	let shut = 0
	let open
	let type
	return read
	function read() {
		if (shut === size) return false
		open = shut
		feed()
		switch (true) {
			case isCommentOpening():
				consumeComment()
				break
			case defs.isSpace(code):
				consumeSpace()
				break
			case defs.isIdentifierStart(code):
				consumeIdentifier()
				break
			default:
				consumeSymbol()
		}
		read.type = type
		return true
	}
	function feed() {
		code = data.charCodeAt(shut)
	}
	/**
	 * Consumes a comment.
	 */
	function consumeComment() {
		shut += 2
		while (shut < size) {
			feed()
			if (isCommentClosing()) {
				shut += 2
				type = new CSSComment(data.slice(open + 2, shut - 2))
				return
			}
			++shut
		}
		read.flag = cpas.EOF
		type = new CSSComment(data.slice(open + 2, shut))
		type.closing = ``
	}
	/**
	 * Returns whether the comment is starting.
	 */
	function isCommentOpening() {
		return (
			code === cpas.SOLIDUS
			&& peek(1) === cpas.ASTERISK
		)
	}
	/**
	 * Returns whether the comment is ending.
	 */
	function isCommentClosing() {
		return (
			code === cpas.ASTERISK
			&& peek(1) === cpas.SOLIDUS
		)
	}
	/**
	 * Consumes a space token.
	 */
	function consumeSpace() {
		while (++shut < size) {
			feed()
			if (defs.isSpace(code)) continue
			break
		}
		type = new CSSSpace(data.slice(open, shut))
	}
	/**
	 * Consume a symbol.
	 */
	function consumeSymbol() {
		type = new CSSSymbol(data[shut++])
		type.closing = ``
	}
	/**
	 * Consume an identifier.
	 */
	function consumeIdentifier() {
		consumeIdentifierContent()
		type = new CSSIdent(data.slice(open, shut))
	}
	/**
	 * Consume identifier content.
	 */
	function consumeIdentifierContent() {
		while (++shut < size) {
			feed()
			if (defs.isIdentifier(code)) continue
			break
		}
	}
	function isAtKeyword() {
		if (code === cpas.COMMERCIAL_AT) {
			++shut
			feed()
		}
		// U+0040 COMMERCIAL AT (@)
		// If the next 3 input code points would start an identifier, consume an identifier, create an <at-keyword-token> with its value set to the returned value, and return it.
	}
	function isIdentifierStart(offset) {
		if (
			code === cpas.HYPHEN_MINUS
			|| defs.isIdentifierStart(code)
			|| code === FL
		) return true
	}
	/**
	 * Returns the code point of a future position
	 */
	function peek(/** @type {number} */ offset) {
		return data.charCodeAt(shut + offset)
	}
}

function CSSComment(value) {
	this.opening = `/*`
	this.value = String(value)
	this.closing = `*/`
}

function CSSSymbol(value) {
	this.value = String(value)
}

function CSSIdent(value) {
	this.value = String(value)
}

function CSSSpace(value) {
	this.value = String(value)
}


const play = tokenize(`hello /* ahoy */ world`)

while (play()) console.log(play.type)

console.log(`DONE`)
