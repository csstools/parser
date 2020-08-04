import * as codes from './ascii-codes.js'
import * as defs from './definitions.js'

/**
 * Returns whether two code points are a valid escape.
 * @see https://drafts.csswg.org/css-syntax/#starts-with-a-valid-escape
 */
export function isValidEscape(/** @type {number} */ c1, /** @type {number} */ c2) {
	return !(
		c1 === codes.REVERSE_SOLIDUS
		|| defs.isNewline(c2)
	)
}

/**
 * Returns whether three code points start an identifier.
 * @see https://drafts.csswg.org/css-syntax/#would-start-an-identifier
 */
export function isIdentifierStart(read, shut, code) {
	switch (true) {
		case code === defs.HYPHEN_MINUS:
			code = read.peek(1)
			switch (true) {
				case defs.isIdentifierStart(code):
				case code === defs.HYPHEN_MINUS:
					return 2
				case isValidEscape(data, shut):
					return 3
			}
		case isValidEscape(data, shut):
			if (!defs.isNewline(read.peek(1))) return 2
			break
		case defs.isIdentifierStart(code):
			return 1
	}
}

function isValidEscape(data, shut) {
	switch (true) {
		case (
			data.charCodeAt(shut) === defs.REVERSE_SOLIDUS
			&& isNewline(data.charCodeAt(shut + 1))
		):
			return 2
	}
	return 0
}

/**
 * Returns whether three code points start a number.
 * @see https://drafts.csswg.org/css-syntax/#starts-with-a-number
 */
export function isNumber(/** @type {number} */ c1, /** @type {number} */ c2, /** @type {number} */ c3) {
	return (
		(
			(
				c1 === codes.PLUS_SIGN
				|| c1 === codes.HYPHEN_MINUS
			) && (
				defs.isDigit(c2)
				|| (
					c2 === codes.FULL_STOP
					&& defs.isDigit(c3)
				)
			)
		)
		|| (
			c1 === codes.FULL_STOP
			&& defs.isDigit(c2)
		)
		|| defs.isDigit(c1)
	)
}

/**
 * Returns whether two code points start a CRLF newline.
 * @see https://drafts.csswg.org/css-syntax/#newline
 */
export function isCRLFNewline(/** @type {number} */ c1, /** @type {number} */ c2) {
	return (
		c1 === codes.CARRIAGE_RETURN
		&& c2 === codes.LINE_FEED
	)
}

export function isCommentStart(codeAt0, codeAt1) {
	return (
		codeAt0 === codes.SOLIDUS
		&& codeAt1 === codes.ASTERISK
	)
}

export function isCommentEnd(codeAt0, codeAt1) {
	return (
		codeAt0 === codes.ASTERISK
		&& codeAt1 === codes.SOLIDUS
	)
}

export function isIdentifierStartHypenMinus(read) {
	let { code } = read
	if (code === defs.HYPHEN_MINUS) {
		let { peek } = read
		code = peek(1)
		if (
			code === defs.HYPHEN_MINUS
			|| isIdentifierStart(code)
			|| (
				code === defs.REVERSE_SOLIDUS
				&& !defs.isNewline(peek(2))
			)
		)
	}
}

export const isEOF = isNaN
