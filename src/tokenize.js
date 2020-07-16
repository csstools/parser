/* Character Codes */
import {
	AT,
	BS,
	DASH,
	DBLQ,
	FS,
	HASH,
	L_RB,
	LC_E,
	PERC,
	PLUS,
	SNGQ,
	STAR,
	STOP,
	UP_E,
} from './utils/code-points.js'

/* Token Identifiers */
import {
	ATWORD_TYPE,
	COMMENT_TYPE,
	FUNCTION_TYPE,
	HASH_TYPE,
	NUMBER_TYPE,
	SPACE_TYPE,
	STRING_TYPE,
	WORD_TYPE,
} from './utils/token-types.js'

/* Tokenizer Utilities */
import {
	isHorizontalSpace,
	isIdentifier,
	isIdentifierStart,
	isInteger,
	isVerticalSpace,
} from './utils/tokenizer-algorithms.js'

import toCSSAtToken from './types/CSSObject/CSSToken/CSSAtToken.fromTokenizer.js'
import toCSSCommentToken from './types/CSSObject/CSSToken/CSSCommentToken.fromTokenizer.js'
import toCSSFunctionToken from './types/CSSObject/CSSToken/CSSFunctionToken.fromTokenizer.js'
import toCSSHashToken from './types/CSSObject/CSSToken/CSSHashToken.fromTokenizer.js'
import toCSSNumberToken from './types/CSSObject/CSSToken/CSSNumberToken.fromTokenizer.js'
import toCSSSpaceToken from './types/CSSObject/CSSToken/CSSSpaceToken.fromTokenizer.js'
import toCSSStringToken from './types/CSSObject/CSSToken/CSSStringToken.fromTokenizer.js'
import toCSSWordToken from './types/CSSObject/CSSToken/CSSWordToken.fromTokenizer.js'
import toCSSSymbolToken from './types/CSSObject/CSSToken/CSSSymbolToken.fromTokenizer.js'

import CSSInput from './types/CSSObject/CSSInput.js'

/**
 * Reads from an input and returns a function for consuming tokens from it.
 * @param {string | import('./types/CSSObject/CSSInput.js')} input - CSS Input being tokenized.
 * @return {tokenize} Consumes a token and returns the current token or null.
 */
export default function tokenize(input) {
	tokenizer.input = input === Object(input) ? input : new CSSInput(input)

	/** @type {string} CSS text being tokenized. */
	const text = String(input.data)

	/** @type {number} Length of characters being read from the text. */
	const size = text.length

	/**
	 * Integer identifying what the current token is.
	 * @type {number}
	 * @example
	 * type === 0 // token is a comment
	 * type === 1 // token is a space
	 */
	let type = tokenizer.type = -1

	let make = null

	/**
	 * String index at the start of the current token.
	 * @type {number}
	 */
	let open

	/**
	 * String index at the end of the current token.
	 * @type {number}
	 */
	let shut = 0

	/**
	 * Number of characters between the prefix and value of the current token.
	 * @type {number}
	 * @example
	 * lead === 1 // e.g. toCSSHashToken token of `#` and `fff`
	 * lead === 1 // e.g. toCSSAtNameToken token of `@` and `media`
	 * lead === 2 // e.g. toCSSCommentToken token of `/*` and ` comment text `
	 */
	let lead

	/**
	 * Number of characters between the value and suffix of the current token.
	 * @type {number}
	 * @example
	 * tail === 3 // e.g. toCSSNumberToken token of `3` and `rem`
	 * tail === 1 // e.g. toCSSFunctionToken token of `var` and `(`
	 * lead === 2 // e.g. toCSSCommentToken token of ` comment text ` and `*​/`
	 */
	let tail

	/**
	 * Current character code.
	 * @type {number}
	 * @example
	 * cc0 === 38 // character code for "&"
	 * cc0 === 46 // character code for "."
	 */
	let cc0

	/** @type {number} Next character code. */
	let cc1

	/** @type {number} Line number at the start of the current token. */
	let line

	/** @type {number} Line number at the end of the current token. */
	let nextLine = 1

	/** @type {number} String index of the line, from the start of the current token. */
	let lineOpen

	/** @type {number} String index of the line, from the end of the current token. */
	let nextLineOpen = 0

	return tokenizer

	/**
	 * Consumes a token and returns the current token or null.
	 * @returns {Token | void}
	 */
	function tokenizer() {
		if (shut === size) {
			type = tokenizer.type = -1
			make = null
			return false
		}

		// update the starting values with the ending values from the last read
		cc0 = text.charCodeAt(shut)
		type = cc0
		make = toCSSSymbolToken
		open = shut
		line = nextLine
		lineOpen = nextLineOpen
		lead = 0
		tail = 0

		switch (true) {
			/**
			 * Consume a Comment or Symbol
			 * @see https://drafts.csswg.org/css-syntax/#comment-diagram
			 * @see https://drafts.csswg.org/css-syntax/#ref-for-typedef-delim-token①⓪
			 */
			case cc0 === FS:
				++shut

				// consume a comment when a slash is followed by an asterisk
				if (text.charCodeAt(shut) === STAR) {
					lead = 2

					while (++shut < size) {
						// consume every character until an asterisk is followed by a slash
						if (isVerticalSpace(text.charCodeAt(shut))) {
							++nextLine

							nextLineOpen = shut + 1
						} else if (
							text.charCodeAt(shut) === STAR
							&& text.charCodeAt(shut + 1) === FS
						) {
							++shut
							++shut

							tail = 2

							break
						}
					}

					type = COMMENT_TYPE
					make = toCSSCommentToken
				}

				break

			/**
			 * Consume a String
			 * @see https://drafts.csswg.org/css-syntax/#string-token-diagram
			 */
			case cc0 === DBLQ:
			case cc0 === SNGQ:
				lead = 1

				while (++shut < size) {
					cc1 = text.charCodeAt(shut)

					// consume any escape (a backslash followed by any character)
					if (cc1 === BS) {
						if (shut + 1 < size) {
							++shut

							if (isVerticalSpace(text.charCodeAt(shut))) {
								++nextLine

								nextLineOpen = shut + 1
							}
						}

						continue
					}

					// stop consuming on the matching quotation
					if (cc1 === cc0) {
						++shut

						tail = 1

						break
					}
				}

				type = STRING_TYPE
				make = toCSSStringToken

				break

			/**
			 * Consume a Hash or Symbol
			 * @see https://drafts.csswg.org/css-syntax/#hash-token-diagram
			 * @see https://drafts.csswg.org/css-syntax/#ref-for-typedef-delim-token①⓪
			 */
			case cc0 === HASH:
				++shut

				// consume a hash when a number-sign is followed by an identifier
				if (
					shut < size
					&& isIdentifier(text.charCodeAt(shut))
				) {
					shut += lead = 1

					consumeIdentifier()

					type = HASH_TYPE
					make = toCSSHashToken
				}

				break

			/**
			 * Consume a Number or Word or Symbol
			 * @see https://drafts.csswg.org/css-syntax/#number-token-diagram
			 * @see https://drafts.csswg.org/css-syntax/#ident-token-diagram
			 * @see https://drafts.csswg.org/css-syntax/#ref-for-typedef-delim-token①⓪
			 */
			case cc0 === DASH:
				cc0 = text.charCodeAt(shut + 1)

				// consume a word when a hyphen-minus starts an identifier
				if (
					// when a hyphen-minus follows a hyphen-minus
					(
						cc0 === DASH
						&& ++shut
					)
					// when an identifier-start follows a hyphen-minus
					|| (
						isIdentifierStart(cc0)
						&& ++shut
					)
					// when an escape (a backslash followed by any non-newline character) follows a hyphen-minus
					|| (
						cc0 === BS
						&& !isVerticalSpace(text.charCodeAt(shut + 2))
						&& ++shut
						&& ++shut
					)
				) {
					++shut

					consumeIdentifier()

					type = WORD_TYPE
					make = toCSSWordToken
				} else {
					++shut
				}

				break

			/**
			 * Consume a Number or Symbol
			 * @see https://drafts.csswg.org/css-syntax/#number-token-diagram
			 * @see https://drafts.csswg.org/css-syntax/#ref-for-typedef-delim-token①⓪
			 */
			case cc0 === PLUS:
				++shut

				cc0 = text.charCodeAt(shut)

				// consume a number when a plus-sign is followed by an integer
				if (
					cc0
					&& isInteger(cc0)
				) {
					++shut

					consumeNumber()

					break
				}

				// consume a number when a plus-sign is followed by a full-stop and then an integer
				if (cc0 === STOP) {
					cc0 = text.charCodeAt(shut + 1)

					if (
						cc0
						&& isInteger(cc0)
					) {
						++shut
						++shut

						consumeNumber(1)
					}
				}

				break

			/**
			 * Consume a Number or Symbol
			 * @see https://drafts.csswg.org/css-syntax/#number-token-diagram
			 * @see https://drafts.csswg.org/css-syntax/#ref-for-typedef-delim-token①⓪
			 */
			case cc0 === STOP:
				++shut

				// consume a number when a full-stop is followed by an integer
				if (isInteger(text.charCodeAt(shut))) {
					++shut

					consumeNumber(1)
				}

				break

			/**
			 * Consume a Word or Symbol
			 * @see https://drafts.csswg.org/css-syntax/#ident-token-diagram
			 * @see https://drafts.csswg.org/css-syntax/#ref-for-typedef-delim-token①⓪
			 */
			case cc0 === BS:
				++shut

				// consume a word when a backslash is followed by a non-newline
				if (!isVerticalSpace(text.charCodeAt(shut))) {
					++shut

					consumeIdentifier()

					type = WORD_TYPE
					make = toCSSWordToken

					break
				}

				++nextLine

				nextLineOpen = shut + 1

				break

			/**
			 * Consume a Space
			 * @see https://drafts.csswg.org/css-syntax/#whitespace-diagram
			 */
			case isVerticalSpace(cc0):
				++nextLine

				nextLineOpen = shut + 1

			case isHorizontalSpace(cc0):
				// consume any additional space
				do {
					++shut

					cc0 = text.charCodeAt(shut)
				} while (
					(
						isVerticalSpace(cc0)
						&& ++nextLine
						&& (
							nextLineOpen = shut + 1
						)
					)
					|| isHorizontalSpace(cc0)
				)

				type = SPACE_TYPE
				make = toCSSSpaceToken

				break

			/**
			 * Consume an At-Word or Symbol
			 * @see https://drafts.csswg.org/css-syntax/#at-keyword-token-diagram
			 * @see https://drafts.csswg.org/css-syntax/#ref-for-typedef-delim-token①⓪
			 */
			case cc0 === AT:
				++shut

				// consume an at-word when an at-sign is followed by an identifier
				if (
					shut < size
					&& isIdentifier(text.charCodeAt(shut))
				) {
					shut += lead = 1

					consumeIdentifier()

					type = ATWORD_TYPE
					make = toCSSAtToken
				}

				break

			/**
			 * Consume a Word or Function
			 * @see https://drafts.csswg.org/css-syntax/#ident-token-diagram
			 * @see https://drafts.csswg.org/css-syntax/#function-token-diagram
			 */
			case isIdentifierStart(cc0):
				// consume a word starting with an identifier-start
				++shut

				consumeIdentifier()

				// consume an function when an identifier is followed by a starting round bracket
				if (text.charCodeAt(shut) === L_RB) {
					tail = 1

					++shut

					type = FUNCTION_TYPE
					make = toCSSFunctionToken
				} else {
					type = WORD_TYPE
					make = toCSSWordToken
				}

				break

			/**
			 * Consume a Number
			 * @see https://drafts.csswg.org/css-syntax/#number-token-diagram
			 * @see https://drafts.csswg.org/css-syntax/#dimension-token-diagram
			 * @see https://drafts.csswg.org/css-syntax/#percentage-token-diagram
			 */
			case isInteger(cc0):
				// consume a number starting with an integer
				++shut

				consumeNumber()

				break

			/**
			 * Consume a Symbol
			 * @see https://drafts.csswg.org/css-syntax/#ref-for-typedef-delim-token①⓪
			 */
			default:
				++shut
		}

		tokenizer.type = type
		tokenizer.token = make(
			text,
			open,
			shut,
			lead,
			tail,
			line,
			open - lineOpen,
			input
		)

		return tokenizer
	}

	/**
	 * Consumes the contents of a word token.
	 */
	function consumeIdentifier() {
		while (shut < size) {
			if (
				(
					isIdentifier(text.charCodeAt(shut))
					&& ++shut
				)
				|| (
					text.charCodeAt(shut) === BS
					&& !isVerticalSpace(text.charCodeAt(shut + 1))
					&& ++shut
					&& ++shut
				)
			) {
				continue
			}
			break
		}
	}

	/**
	 * Consumes the contents of a number token.
	 * @arg {boolean} [isDecimal] Whether consuming is after a decimal point.
	 * @arg {boolean} [isScientific] Whether consuming is after a scientific expression.
	 */
	function consumeNumber(isDecimal, isScientific) {
		while (shut < size) {
			if (
				// consume an integer
				(
					isInteger(text.charCodeAt(shut))
					&& ++shut
				)
				// if a non-decimal, consume a full-stop followed by an integer
				|| (
					!isDecimal
					&& text.charCodeAt(shut) === STOP
					&& isInteger(text.charCodeAt(shut + 1))
					&& (
						isDecimal = 1
					)
					&& ++shut
					&& ++shut
				)
				// if non-scientific, consume an "E" or "e"...
				|| (
					!isScientific
					&& (
						cc1 = text.charCodeAt(shut)
					)
					&& (
						cc1 === UP_E
						|| cc1 === LC_E
					)
					&& (
						cc1 = text.charCodeAt(shut + 1)
					)
					&& (
						// ...followed by an integer; or,
						(
							isInteger(cc1)
							&& ++shut
						)
						// ...followed by a plus-sign or hyphen-minus and then an integer
						|| (
							(
								cc1 === PLUS
								|| cc1 === DASH
							)
							&& isInteger(text.charCodeAt(shut + 1))
							&& ++shut
							&& ++shut
						)
					)
					&& (
						isScientific = 1
					)
				)
			) {
				continue
			}
			break
		}

		// consume a percent-sign or any identifier as the unit
		if (text.charCodeAt(shut) === PERC) {
			++shut
			tail = 1
		} else {
			// temporarily assign `tail` the value of `shut`
			tail = shut

			consumeIdentifier()

			// reassign `tail` the length of the unit
			tail = shut - tail
		}

		type = NUMBER_TYPE
		make = toCSSNumberToken
	}
}

/**
 * @typedef {() => () => Tokenizer} tokenize - Reads CSS and returns a function for consuming tokens from it.
 */

/**
 * @typedef {Object} Tokenizer - Reads CSS and returns a function for consuming tokens from it.
 * @property {string} type - Integer identifying what the current token is.
 * @property {import('./types/CSSObject/CSSToken.js')} token - CSS Token being generated from the CSS.
 * @property {import('./types/CSSObject/CSSInput.js')} input - CSS Input being tokenized.
 */
