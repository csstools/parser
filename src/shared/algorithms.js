import * as codes from './character-codes.js'
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
export function isIdentifierStart(/** @type {number} */ c1, /** @type {number} */ c2, /** @type {number} */ c3) {
	return (
		(
			c1 === codes.HYPHEN_MINUS
			&& (
				c2 === codes.HYPHEN_MINUS
				|| defs.isIdentifierStart(c2)
				|| are2AValidEscape(c2, c3)
			)
		)
		|| defs.isIdentifierStart(c1)
		|| are2AValidEscape(c1, c2)
	)
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
