import * as codes from './character-codes.js'

/**
 * Returns whether the code point is a digit.
 * @see https://drafts.csswg.org/css-syntax/#digit
 */
export function isDigit(/** @type {number} */ code) {
	return code >= codes.DIGIT_ZERO && code <= codes.DIGIT_NINE
}

/**
 * Returns whether the code point is an uppercase letter.
 * @see https://drafts.csswg.org/css-syntax/#uppercase-letter
 */
export function isUppercaseLetter(/** @type {number} */ code) {
	return code >= codes.LATIN_CAPITAL_LETTER_A && code <= codes.LATIN_CAPITAL_LETTER_Z
}

/**
 * Returns whether the code point is a lowercase letter.
 * @see https://drafts.csswg.org/css-syntax/#lowercase-letter
 */
export function isLowercaseLetter(/** @type {number} */ code) {
	return code >= codes.LATIN_SMALL_LETTER_A && code <= codes.LATIN_SMALL_LETTER_Z
}

/**
 * Returns whether the code point is a letter.
 * @see https://drafts.csswg.org/css-syntax/#letter
 */
export function isLetter(/** @type {number} */ code) {
	return (
		isUppercaseLetter(code)
		|| isLowercaseLetter(code)
	)
}

/**
 * Returns whether the code point is non-ascii.
 * @see https://drafts.csswg.org/css-syntax/#non-ascii-code-point
 */
export function isNonAscii(/** @type {number} */ code) {
	return code > codes.DELETE
}

/**
 * Returns whether the code point is an identifier start.
 * @see https://drafts.csswg.org/css-syntax/#identifier-start-code-point
 */
export function isIdentifierStart(/** @type {number} */ code) {
	return (
		isLetter(code)
		|| isNonAscii(code)
		|| code === codes.LOW_LINE
	)
}

/**
 * Returns whether the code point is an identifier.
 * @see https://drafts.csswg.org/css-syntax/#identifier-code-point
 */
export function isIdentifier(/** @type {number} */ code) {
	return (
		isIdentifierStart(code)
		|| isDigit(code)
		|| code === codes.HYPHEN_MINUS
	)
}

/**
 * Returns whether the code point is a newline.
 * @see https://drafts.csswg.org/css-syntax/#newline
 */
export function isNewline(/** @type {number} */ code) {
	return (
		code === codes.LINE_FEED
		|| code === codes.FORM_FEED
		|| code === codes.CARRIAGE_RETURN
	)
}

/**
 * Returns whether the code point is a space.
 * @see https://drafts.csswg.org/css-syntax/#whitespace
 */
export function isSpace(/** @type {number} */ code) {
	return (
		code === codes.CHARACTER_TABULATION
		|| code === codes.LINE_FEED
		|| code === codes.FORM_FEED
		|| code === codes.CARRIAGE_RETURN
		|| code === codes.SPACE
	)
}
