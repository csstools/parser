import * as codes from './codes.js'
import * as defs from './defs.js'
import * as types from './types.js'

/** @arg {string} text */
export default function tokenizer(text) {
	const size = text.length
	const done = size === 0
	const type = types.EOF_TYPE
	const data = {
		next,
		read,
		text,
		done,
		size,
		type,
		mark: 0,
		trio: ['', '', ''],
		codeAt0: text.charCodeAt(0),
		codeAt1: text.charCodeAt(1),
		codeAt2: text.charCodeAt(2),
	}
	return data
	function read() {
		++data.mark
		data.codeAt0 = data.codeAt1
		data.codeAt1 = data.codeAt2
		data.codeAt2 = data.text.charCodeAt(data.mark + 2)
		data.done = size < data.mark
		return !data.done
	}
	function next() {
		switch (true) {
			case data.codeAt0 === codes.SOLIDUS:
				switch (true) {
					case data.codeAt1 === codes.ASTERISK:
						data.type = types.COMMENT_TYPE
						data.trio = defs.consumeAComment(data)
						return data
					default:
						data.type = codes.SOLIDUS
						data.trio = defs.consumeACharacter(data)
						return data
				}
			case defs.isSpace(data.codeAt0):
				data.type = types.SPACE_TYPE
				data.trio = ['', defs.consumeSpace(data), '']
				return data
			case data.codeAt0 === codes.QUOTATION_MARK:
				console.log('<string-token>')
				return
			case data.codeAt0 === codes.NUMBER_SIGN:
				switch (true) {
					case (
						defs.isIdentifier(data.codeAt0)
						|| defs.isValidEscape(data.codeAt0, data.codeAt1)
					):
						console.log('<hash-token>')
						return
					default:
						data.type = codes.NUMBER_SIGN
						data.trio = defs.consumeACharacter(data)
						return data
				}
			case data.codeAt0 === codes.APOSTROPHE:
				console.log('<string-token>')
				return
			case data.codeAt0 === codes.LEFT_PARENTHESIS:
				data.type = codes.LEFT_PARENTHESIS
				data.trio = defs.consumeACharacter(data)
				return data
			case data.codeAt0 === codes.RIGHT_PARENTHESIS:
				data.type = codes.RIGHT_PARENTHESIS
				data.trio = defs.consumeACharacter(data)
				return data
			case data.codeAt0 === codes.PLUS_SIGN:
				switch (true) {
					case defs.isNumberOpen(data.codeAt0, data.codeAt1, data.codeAt2):
						console.log('<number-token>')
						return
					default:
						data.type = codes.PLUS_SIGN
						data.trio = defs.consumeACharacter(data)
						return data
				}
			case data.codeAt0 === codes.COMMA:
				data.type = codes.COMMA
				data.trio = defs.consumeACharacter(data)
				return data
			case data.codeAt0 === codes.HYPHEN_MINUS:
				switch (true) {
					case defs.isNumberOpen(data.codeAt0, data.codeAt1, data.codeAt2):
						console.log('<number-token>')
						return
					case defs.doesStartWithAnIdentifier(data.codeAt0, data.codeAt1, data.codeAt2):
						data.type = types.WORD_TYPE
						data.trio = ['', defs.consumeAnIdentifier(data), '']
						return data
					default:
						data.type = codes.HYPHEN_MINUS
						data.trio = defs.consumeACharacter(data)
						return data
				}
			case data.codeAt0 === codes.FULL_STOP:
				switch (true) {
					case defs.isNumberOpen(data.codeAt0, data.codeAt1, data.codeAt2):
						console.log('<number-token>')
						return
					default:
						data.type = codes.FULL_STOP
						data.trio = defs.consumeACharacter(data)
						return data
				}
			case data.codeAt0 === codes.COLON:
				data.type = codes.COLON
				data.trio = defs.consumeACharacter(data)
				return data
			case data.codeAt0 === codes.SEMICOLON:
				data.type = codes.SEMICOLON
				data.trio = defs.consumeACharacter(data)
				return data
			case data.codeAt0 === codes.COMMERCIAL_AT:
				return
			case data.codeAt0 === codes.LEFT_SQUARE_BRACKET:
				data.type = codes.LEFT_SQUARE_BRACKET
				data.trio = defs.consumeACharacter(data)
				return data
			case data.codeAt0 === codes.REVERSE_SOLIDUS:
				switch (true) {
					case defs.isValidEscape(data.codeAt0, data.codeAt1):
						data.type = types.WORD_TYPE
						data.trio = ['', defs.consumeAnIdentifier(data), '']
						return data
					default:
						data.type = codes.REVERSE_SOLIDUS
						data.trio = defs.consumeACharacter(data)
						return data
				}
			case data.codeAt0 === codes.RIGHT_SQUARE_BRACKET:
				data.type = types.RIGHT_SQUARE_BRACKET
				data.trio = defs.consumeACharacter(data)
				return data
			case data.codeAt0 === codes.LEFT_CURLY_BRACKET:
				data.type = codes.LEFT_CURLY_BRACKET
				data.trio = defs.consumeACharacter(data)
				return data
			case data.codeAt0 === codes.RIGHT_CURLY_BRACKET:
				data.type = codes.RIGHT_CURLY_BRACKET
				data.trio = defs.consumeACharacter(data)
				return data
			case defs.isDigit(data.codeAt0):
				console.log('<number-token>')
				return
			case defs.isIdentifierStart(data.codeAt0):
				data.type = types.WORD_TYPE
				data.trio = ['', defs.consumeAnIdentifier(data), '']
				return data
			case defs.isEOF(data.codeAt0):
				data.done = true
				data.type = types.EOF
				data.trio = ''
				return false
			default:
				data.type = data.codeAt0
				data.trio = defs.consumeACharacter(data)
				return data
		}
	}
}

