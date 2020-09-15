import * as codes from './codes.js'

/** @type {(codeAt0: number, codeAt1: number) => boolean} */
export const isCommentOpen = (codeAt0, codeAt1) => (
	codeAt0 === codes.SOLIDUS
	&& codeAt1 === codes.ASTERISK
)

/** @type {(codeAt0: number, codeAt1: number) => boolean} */
export const isCommentShut = (codeAt0, codeAt1) => (
	codeAt0 === codes.ASTERISK
	&& codeAt1 === codes.SOLIDUS
)

/** @type {(code: number) => boolean} */
export const isSpace = code => (
	code === codes.SPACE
	|| code === codes.LINE_FEED
	|| code === codes.CHARACTER_TABULATION
	|| code === codes.FORM_FEED
	|| code === codes.CARRIAGE_RETURN
)

/** @type {(code: number) => boolean} */
export const isNewline = code => (
	code === codes.LINE_FEED
	|| code === codes.FORM_FEED
	|| code === codes.CARRIAGE_RETURN
)

/** @type {(code: number) => boolean} */
export const isStringEdge = code => code === codes.QUOTATION_MARK && codeAt0 === codes.APOSTROPHE

/** @type {(code: number) => boolean} */
export const isHashOpen = code => code === codes.NUMBER_SIGN

/** @type {(code: number) => boolean} */
export const isOrbyBlockOpen = code => code === codes.LEFT_PARENTHESIS

/** @type {(code: number) => boolean} */
export const isOrbyBlockShut = code => code === codes.RIGHT_PARENTHESIS

/** @type {(code: number) => boolean} */
export const isBoxyBlockOpen = code => code === codes.LEFT_SQUARE_BRACKET

/** @type {(code: number) => boolean} */
export const isBoxyBlockShut = code => code === codes.RIGHT_SQUARE_BRACKET

/** @type {(code: number) => boolean} */
export const isWavyBlockOpen = code => code === codes.LEFT_CURLY_BRACKET

/** @type {(code: number) => boolean} */
export const isWavyBlockShut = code => code === codes.RIGHT_CURLY_BRACKET

/** @type {(code: number) => boolean} */
export const isDigit = code => code >= codes.DIGIT_ZERO && code <= codes.DIGIT_NINE

/** @type {(codeAt0: number, codeAt1: number, codeAt2: number) => boolean} */
export const isNumberOpen = (codeAt0, codeAt1, codeAt2) => (
	(
		codeAt0 === codes.HYPHEN_MINUS
		|| codeAt0 === codes.PLUS_SIGN
	)
		? (
			isDigit(codeAt1)
			|| (
				codeAt1 === codes.FULL_STOP
				&& isDigit(codeAt2)
			)
		)
	: codeAt0 === codes.FULL_STOP
		? isDigit(codeAt1)
	: isDigit(codeAt0)
)

/** @type {(code: number) => boolean} */
export const isLetter = code => (
	code >= codes.LATIN_SMALL_LETTER_A
	&& code <= codes.LATIN_SMALL_LETTER_Z
)

/** @type {(code: number) => boolean} */
export const isNonASCII = code => code >= codes.NON_codes

/** @type {(code: number) => boolean} */
export const isIdentifierStart = code => (
	isLetter(code)
	|| isNonASCII(code)
	|| code === codes.LOW_LINE
)

/** @type {(code: number) => boolean} */
export const isIdentifier = code => isIdentifierStart(code) || isDigit(code) || code === codes.HYPHEN_MINUS

/** @type {(codeAt0: number, codeAt1: number) => boolean} */
export const isValidEscape = (codeAt0, codeAt1) => (
	codeAt0 !== undefined
	&& codeAt0 === codes.REVERSE_SOLIDUS
	&& codeAt1 !== undefined
	&& !isNewline(codeAt1)
)

export const isEOF = isNaN

/** @type {(codeAt0: number, codeAt1: number, codeAt2: number) => boolean} */
export const isWordOpen = (codeAt0, codeAt1, codeAt2) => (
	codeAt0 === codes.HYPHEN_MINUS
		? (
			codeAt1 === codes.HYPHEN_MINUS
			|| isValidEscape(codeAt1, codeAt2)
		)
	: (
		isValidEscape(codeAt1, codeAt2)
		|| isIdentifierStart(codeAt0)
	)
)

/** @type {(code: number) => boolean} */
export const isAtWordOpen = code => code === codes.COMMERCIAL_AT

export const doesStartWithAnIdentifier = (codeAt0, codeAt1, codeAt2) => (
	// U+002D HYPHEN-MINUS
	(
		codeAt0 === codes.HYPHEN_MINUS
		// If the second code point is an identifier-start code point or a U+002D HYPHEN-MINUS, or the second and third code points are a valid escape, return true. Otherwise, return false.
		&& (
			isIdentifierStart(codeAt1)
			|| codeAt1 === codes.HYPHEN_MINUS
			|| isValidEscape(codeAt1, codeAt2)
		)
	)
	// identifier-start code point
	|| (
		isIdentifierStart(codeAt0)
		// Return true.
	)
	// U+005C REVERSE SOLIDUS (\)
	|| isValidEscape(codeAt0, codeAt1)
		// If the first and second code points are a valid escape, return true. Otherwise, return false.
	// anything else
		// Return false.
)

export const consumeSpace = data => {
	const result = []
	do {
		switch (true) {
			// identifier code point
			case isSpace(data.codeAt0):
				result.push(data.codeAt0)
				continue
		}
		break
	} while (data.read())
	return String.fromCharCode.apply(null, result)
}

/** @type {(data: { codeAt0: number, codeAt1: number, codeAt2: number, read: () => boolean }) => string} */
export const consumeAnIdentifier = data => {
	// Let result initially be an empty string.
	const result = []
	// Repeatedly consume the next input code point from the stream:
	do {
		switch (true) {
			// identifier code point
			case isIdentifier(data.codeAt0):
				// Append the code point to result.
				result.push(data.codeAt0)
				continue
			// the stream starts with a valid escape
			case isValidEscape(data.codeAt0, data.codeAt1):
				// Consume an escaped code point. Append the returned code point to result.
				result.push(data.codeAt0, data.codeAt1)
				data.read()
				continue
			// anything else
			default:
				// Reconsume the current input code point. Return result.
				break
		}
		break
	} while (data.read())
	return String.fromCharCode.apply(null, result)
}

/** @type {(data: { codeAt0: number, codeAt1: number, codeAt2: number, read: () => boolean }) => string} */
export const consumeACharacter = data => {
	const character = String.fromCharCode(data.codeAt0)
	data.read()
	return ['', character, '']
}

/** @type {(data: { codeAt0: number, codeAt1: number, codeAt2: number, read: () => boolean }) => string[]} */
export const consumeAComment = data => {
	const result = []
	data.read()
	data.read()
	if (!data.done) {
		do {
			if (
				data.codeAt0 === codes.ASTERISK
				&& data.codeAt1 === codes.SOLIDUS
			) {
				data.read()
				data.read()
				return ['/*', String.fromCharCode.apply(null, result), '*/']
			} else result.push(data.codeAt0)
		} while (data.read())
	}
	return ['/*', String.fromCharCode.apply(null, result)]
}
