import { CR, CTRL, DASH, FF, LC_A, LC_Z, LF, LL, NINE, SP, TAB, UP_A, UP_Z, ZERO } from '../utils/code-points.js'

/**
 * Returns whether the character code is a vertical space.
 * @argument {number} cc - Character code.
 * @returns {boolean}
 */
export function isVerticalSpace(cc) {
	return cc === LF || cc === FF || cc === CR
}

/**
 * Returns whether the character code is a horizontal space.
 * @argument {number} cc - Character code.
 * @returns {boolean}
 */
export function isHorizontalSpace(cc) {
	return cc === TAB || cc === SP
}

/**
 * Returns whether the character code is an integer.
 * @argument {number} cc - Character code.
 * @returns {boolean}
 */
export function isInteger(cc) {
	return cc >= ZERO && cc <= NINE
}

/**
 * Returns whether the character code is a low-line, non-ASCII, or letter.
 * @argument {number} cc - Character code.
 * @returns {boolean}
 */
export function isIdentifierStart(cc) {
	return (
		// when the character is a low-line
		cc === LL
		// when the character is a non-ASCII
		|| cc >= CTRL
		// when the character is an uppercase letter
		|| (
			cc >= UP_A
			&& cc <= UP_Z
		)
		// when the character is a lowercase letter
		|| (
			cc >= LC_A
			&& cc <= LC_Z
		)
	)
}

/**
 * Returns whether the character code is a low-line, dash, non-ASCII, number, or letter.
 * @argument {number} cc - Character code.
 * @returns {boolean}
 */
export function isIdentifier(cc) {
	return (
		// when the character is a low-line
		cc === LL
		// when the character is a dash
		|| cc === DASH
		// when the character is a non-ASCII
		|| cc >= CTRL
		// when the character is a number
		|| (
			cc >= ZERO
			&& cc <= NINE
		)
		// when the character is an uppercase letter
		|| (
			cc >= UP_A
			&& cc <= UP_Z
		)
		// when the character is a lowercase letter
		|| (
			cc >= LC_A
			&& cc <= LC_Z
		)
	)
}
