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

/**
 * Reads from an input and returns a function for consuming tokens from it.
 * @arg {string} cssText - CSS text being tokenized.
 * @return {tokenize} Returns whether it consumed and assigned a token to itself.
 */
export default function tokenize(cssText) {
	/** @type {number} Length of characters being read from the text. */
	const size = cssText.length

	/**
	 * Integer identifying what the current token is.
	 * @type {number}
	 * @example
	 * type === 0 // token is a comment
	 * type === 1 // token is a space
	 */
	let type

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

	tokenizer.getChar = getChar
	tokenizer.getText = getText
	tokenizer.getLead = getLead
	tokenizer.getTail = getTail

	return tokenizer

	/**
	 * Consumes a token and returns the current token or null.
	 * @returns {Token | void}
	 */
	function tokenizer() {
		if (shut === size) return false

		// update the starting values with the ending values from the last read
		cc0 = cssText.charCodeAt(shut)
		type = cc0
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
				if (cssText.charCodeAt(shut) === STAR) {
					lead = 2

					while (++shut < size) {
						// consume every character until an asterisk is followed by a slash
						if (isVerticalSpace(cssText.charCodeAt(shut))) {
							++nextLine

							nextLineOpen = shut + 1
						} else if (
							cssText.charCodeAt(shut) === STAR
							&& cssText.charCodeAt(shut + 1) === FS
						) {
							++shut
							++shut

							tail = 2

							break
						}
					}

					type = COMMENT_TYPE
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
					cc1 = cssText.charCodeAt(shut)

					// consume any escape (a backslash followed by any character)
					if (cc1 === BS) {
						if (shut + 1 < size) {
							++shut

							if (isVerticalSpace(cssText.charCodeAt(shut))) {
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
					&& isIdentifier(cssText.charCodeAt(shut))
				) {
					shut += lead = 1

					consumeIdentifier()

					type = HASH_TYPE
				}

				break

			/**
			 * Consume a Number or Word or Symbol
			 * @see https://drafts.csswg.org/css-syntax/#number-token-diagram
			 * @see https://drafts.csswg.org/css-syntax/#ident-token-diagram
			 * @see https://drafts.csswg.org/css-syntax/#ref-for-typedef-delim-token①⓪
			 */
			case cc0 === DASH:
				cc0 = cssText.charCodeAt(shut + 1)

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
						&& !isVerticalSpace(cssText.charCodeAt(shut + 2))
						&& ++shut
						&& ++shut
					)
				) {
					++shut

					consumeIdentifier()

					type = WORD_TYPE
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

				cc0 = cssText.charCodeAt(shut)

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
					cc0 = cssText.charCodeAt(shut + 1)

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
				if (isInteger(cssText.charCodeAt(shut))) {
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
				if (!isVerticalSpace(cssText.charCodeAt(shut))) {
					++shut

					consumeIdentifier()

					type = WORD_TYPE

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

					cc0 = cssText.charCodeAt(shut)
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
					&& isIdentifier(cssText.charCodeAt(shut))
				) {
					shut += lead = 1

					consumeIdentifier()

					type = ATWORD_TYPE
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
				if (cssText.charCodeAt(shut) === L_RB) {
					tail = 1

					++shut

					type = FUNCTION_TYPE
				} else {
					type = WORD_TYPE
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
		tokenizer.open = open
		tokenizer.shut = shut
		tokenizer.lead = lead
		tokenizer.tail = tail
		tokenizer.smap = [ line, open - lineOpen ]

		return true
	}

	function getChar() {
		return cssText.charAt(open)
	}

	function getText() {
		return cssText.slice(open + lead, shut - tail)
	}

	function getLead() {
		return cssText.slice(open, open + lead)
	}

	function getTail() {
		return cssText.slice(shut - tail, shut)
	}

	/**
	 * Consumes the contents of a word token.
	 */
	function consumeIdentifier() {
		while (shut < size) {
			if (
				(
					isIdentifier(cssText.charCodeAt(shut))
					&& ++shut
				)
				|| (
					cssText.charCodeAt(shut) === BS
					&& !isVerticalSpace(cssText.charCodeAt(shut + 1))
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
					isInteger(cssText.charCodeAt(shut))
					&& ++shut
				)
				// if a non-decimal, consume a full-stop followed by an integer
				|| (
					!isDecimal
					&& cssText.charCodeAt(shut) === STOP
					&& isInteger(cssText.charCodeAt(shut + 1))
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
						cc1 = cssText.charCodeAt(shut)
					)
					&& (
						cc1 === UP_E
						|| cc1 === LC_E
					)
					&& (
						cc1 = cssText.charCodeAt(shut + 1)
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
							&& isInteger(cssText.charCodeAt(shut + 1))
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
		if (cssText.charCodeAt(shut) === PERC) {
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
	}
}

/**
 * @typedef {() => () => Tokenizer} tokenize - Reads CSS and returns a function for consuming tokens from it.
 */

/**
 * @typedef {Object} Tokenizer - Reads CSS and returns a function for consuming tokens from it.
 * @property {[ number, number, number, number, number, number, number ]} token - CSS Token being generated from the CSS.
 */
