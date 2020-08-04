import * as t from '../shared/code-points.js'

export default function tokenize(/** @type {string} */ data) {
	const size = data.length
	const codeAt = data.charCodeAt.bind(data)

	let open = 0
	let shut = 0
	let code = t.EOF
	let stringShutCode = t.EOF

	return read

	function read() {
		if (shut === size) return false
		open = shut
		code = peek(0)
		if (isCommentStart()) consumeCommentToken()
		else if (isSpaceStart()) consumeSpaceToken()
		else if (isStringStart()) consumeStringToken()
		else if (isNumberStart()) consumeNumberToken()
		else if (isAtWordStart()) consumeAtWordToken()
		else if (isWordStart()) consumeWordToken()
		else consumeSymbol()
		return true
	}
	function next() {
		if (++shut <= size) {
			code = codeAt(shut)
			return true
		}
		--shut
		return false
	}
	function peek(by) {
		return data.charCodeAt(shut + by)
	}
	// <comment-token>
	function isCommentStart() {
		if (
			code === t.SOLIDUS
			&& peek(1) === t.ASTERISK
		) {
			shut += 2
			return true
		}
		return false
	}
	function consumeCommentToken() {
		while (next()) {
			if (code !== t.ASTERISK) continue
			if (peek(1) !== t.SOLIDUS) continue
			shut += 2
			read.type = new CSSComment(getText(2, 2))
			return true
		}
		read.type = new CSSComment(getText(2, 0))
		read.flag = true
		return true
	}
	// <space-token>
	function isSpaceStart() {
		return t.isSpace(code)
	}
	function consumeSpaceToken() {
		while (next()) {
			if (!isSpaceStart()) {
				break
			}
		}
		read.type = new CSSSpace(getText(0, 0))
	}
	// <string-token>
	function isStringStart() {
		return (
			code === t.QUOTATION_MARK
			|| code === t.APOSTROPHE
		)
	}
	function consumeStringToken() {
		stringShutCode = code
		const isApostrophe = code === t.APOSTROPHE
		while (++shut <= size) {
			code = codeAt(shut)
			if (isStringEnd()) {
				++shut
				read.type = new CSSString(getText(1, 1), isApostrophe)
				return
			}
			if (isValidEscape()) shut += 2
		}
		read.flag = true
		read.type = new CSSString(getText(1, 1), isApostrophe)
		read.type.closing = ``
	}
	function isStringEnd() {
		return code === stringShutCode
	}
	function isValidEscape() {
		return (
			code === t.REVERSE_SOLIDUS
			&& !t.isNewline(peek(1))
		)
	}
	// <number-token>
	function isNumberStart() {
		return t.isDigit(code)
	}
	function consumeNumberToken() {
		while (++shut <= size) {
			code = codeAt(shut)
			if (!t.isDigit(peek(0))) {
				break
			}
		}
		read.type = new CSSNumber(getText(0, 0), ``)
		open = shut
		if (isWordStart()) {
			consumeWordContent()
			read.type.unit = getText(0, 0)
		}
	}
	// <atword-token>
	function isAtWordStart() {
		if (isCommercialAt()) {
			if (++shut <= size) {
				code = codeAt(shut)
				isWordStart()
				return true
			}
			--shut
		}
		return false
	}
	function consumeAtWordToken() {
		consumeWordContent()
		read.type = new CSSAtWord(getText(1, 0))
	}
	function isCommercialAt() {
		return code === t.COMMERCIAL_AT
	}
	// isWordContent
	function isWordContent() {
		return (
			isIdentifier()
			|| isValidEscape()
		)
	}
	function consumeWordContent() {
		while (++shut <= size) {
			code = codeAt(shut)
			if (!isWordContent()) {
				break
			}
		}
	}
	function isIdentifier() {
		return t.isIdentifier(code)
	}
	function isIdentifierStart() {
		return t.isIdentifierStart(code)
	}
	// <word-token>
	function isWordStart() {
		return (
			isIdentifierStart()
			|| isValidEscape()
		)
	}
	function consumeWordToken() {
		consumeWordContent()
		read.type = new CSSWord(getText(0, 0), ``)
	}
	// <symbol-token>
	function consumeSymbol() {
		++shut
		read.type = new CSSSymbol(getText(0, 0))
	}
	// ...
	function getText(lead, tail) {
		return data.slice(open + lead, shut - tail)
	}
}

function CSSComment(value) {
	this.opening = `/*`
	this.value = value
	this.closing = `*/`
}
function CSSSpace(value) {
	this.value = value
}
function CSSString(value, isApostrophe) {
	this.opening = isApostrophe ? `'` : `"`
	this.value = value
	this.closing = isApostrophe ? `'` : `"`
}
function CSSNumber(value, unit) {
	this.value = value
	this.unit = unit
}
function CSSWord(value) {
	this.value = value
}
function CSSAtWord(value) {
	this.symbol = `@`
	this.value = value
}
function CSSSymbol(value) {
	this.value = value
}

const play = tokenize(`hello   @earth @a "bobby" 52 3em /* hello */   `)

while (play()) console.log({ type: play.type }, `\n===`)

console.log(`DONE`)
