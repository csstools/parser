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
} from './utils/node-types.js'

/* Tokenizer Utilities */
import {
	isHorizontalSpace,
	isIdentifier,
	isIdentifierStart,
	isInteger,
	isVerticalSpace,
} from './utils/tokenizer-algorithms.js'

import CSSAtWord from './types/CSSObject/CSSToken/CSSAtWord.js'
import CSSComment from './types/CSSObject/CSSToken/CSSComment.js'
import CSSFunctionToken from './types/CSSObject/CSSToken/CSSFunctionToken.js'
import CSSHash from './types/CSSObject/CSSToken/CSSHash.js'
import CSSNumber from './types/CSSObject/CSSToken/CSSNumber.js'
import CSSSpace from './types/CSSObject/CSSToken/CSSSpace.js'
import CSSString from './types/CSSObject/CSSToken/CSSString.js'
import CSSWord from './types/CSSObject/CSSToken/CSSWord.js'
import CSSSymbol from './types/CSSObject/CSSToken/CSSSymbol.js'

/**
 * Reads CSS and returns a function for consuming tokens from it.
 * @param {string} text - Text being read as CSS tokens.
 * @return {Token} Consumes a token and returns the current token or null.
 */
function tokenize(input) {
	tokenizer.input = input

	/** @type {string} Text being read as CSS tokens. */
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
	let TYPE = tokenizer.type = -1
	let Type = null

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
	 * lead === 1 // e.g. CSSHash token of `#` and `fff`
	 * lead === 1 // e.g. CSSAtName token of `@` and `media`
	 * lead === 2 // e.g. CSSComment token of `/*` and ` comment text `
	 */
	let lead

	/**
	 * Number of characters between the value and suffix of the current token.
	 * @type {number}
	 * @example
	 * tail === 3 // e.g. CSSNumber token of `3` and `rem`
	 * tail === 1 // e.g. CSSFunctionToken token of `var` and `(`
	 * lead === 2 // e.g. CSSComment token of ` comment text ` and `*​/`
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
			TYPE = tokenizer.type = -1
			Type = null
			return false
		}

		// update the starting values with the ending values from the last read
		cc0 = text.charCodeAt(shut)
		TYPE = cc0
		Type = CSSSymbol
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

					TYPE = COMMENT_TYPE
					Type = CSSComment
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

				TYPE = STRING_TYPE
				Type = CSSString

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

					TYPE = HASH_TYPE
					Type = CSSHash
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

					TYPE = WORD_TYPE
					Type = CSSWord
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

					TYPE = WORD_TYPE
					Type = CSSWord

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

				TYPE = SPACE_TYPE
				Type = CSSSpace

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

					TYPE = ATWORD_TYPE
					Type = CSSAtWord
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

					TYPE = FUNCTION_TYPE
					Type = CSSFunctionToken
				} else {
					TYPE = WORD_TYPE
					Type = CSSWord
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

		tokenizer.type = TYPE
		tokenizer.node = Type.fromTokenizer(
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

		TYPE = NUMBER_TYPE
		Type = CSSNumber
	}
}

export default tokenize

/**
 * @typedef {Object} Token - Reads CSS and returns a function for consuming tokens from it.
 * @property {() => Token | void} read - Consumes a token and returns the current token or null.
 * @property {string} text - Text being tokenized as CSS.
 * @property {number} size - Length of characters being read from the text.
 * @property {number} type - Integer identifying what the current token is.
 * @property {number} open - Starting string index of the current token.
 * @property {number} shut - Ending string index of the current token.
 * @property {number} lead - Number of characters between the prefix and value of the current token.
 * @property {number} tail - Number of characters between the value and suffix of the current token.
 * @property {number} line - Line number at the start of the current token.
 * @property {number} lcol - Column number at the start of the current token.
 */
