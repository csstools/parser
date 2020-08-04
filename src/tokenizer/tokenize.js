import * as t from '../shared/ascii-codes.js'

export default function tokenize(data) {
	const size = data.length
	let shut = read.open = 0
	let node = read.node = null

	let code
	let isNumberDecimal
	let isNumberScientific
	let open
	let save

	return read

	function read() {
		if (shut === size) return false

		open = read.open = shut
		code = data.charCodeAt(shut)
		isNumberDecimal = false
		isNumberScientific = false

		/**
		 * Consume a Comment Token
		 * @see https://drafts.csswg.org/css-syntax/#comment-diagram
		 */
		if (
			code === t.SOLIDUS
			&& data.charCodeAt(shut + 1) === t.ASTERISK
		) {
			shut += 2
			capacity: {
				// consume valid comment
				validity: while (true) {
					if (++shut < size) {
						code = data.charCodeAt(shut)
						while (code === t.ASTERISK) {
							if (++shut < size) {
								code = data.charCodeAt(shut)
								if (code === t.SOLIDUS) {
									node = new CSSComment(data.slice(open + 2, ++shut - 2))
									break capacity
								}
							} else break validity
						}
					} else break
				}
				// consume invalid comment
				node = new CSSComment(data.slice(open + 2, shut))
				node.suffix = ``
			}
		}

		/**
		 * Consume a Space Token
		 * @see https://drafts.csswg.org/css-syntax/#whitespace-diagram
		 */
		else if (isSpaceNow()) {
			// consume valid space
			while (++shut < size) {
				code = data.charCodeAt(shut)
				if (isSpaceNow()) continue
				else break
			}
			node = new CSSSpace(data.slice(open, shut))
		}

		/**
		 * Consume a String Token
		 * @see https://drafts.csswg.org/css-syntax/#string-token-diagram
		 */
		else if (
			code === t.QUOTATION_MARK
			|| code === t.APOSTROPHE
		) {
			save = code
			capacity: {
				// consume valid string
				while (true) {
					if (++shut < size) {
						code = data.charCodeAt(shut)
						if (code === save) {
							node = new CSSString(data.slice(open + 1, ++shut - 1), String.fromCharCode(save))
							break capacity
						}
						if (code === t.REVERSE_SOLIDUS) {
							if (++shut < size) continue
							break
						}
					} else break
				}
				// consume invalid string
				node = new CSSString(data.slice(open + 1, shut))
				node.suffix = ``
			}
		}

		/**
		 * Consume a Hash Token
		 * @see https://drafts.csswg.org/css-syntax/#hash-token-diagram
		 */
		else if (isHashStart()) {
			// consume valid hash
			consumeWordLike()
			node = new CSSHash(data.slice(open + 1, shut))
		}

		/**
		 * Consume an AtWord Token
		 * @see https://drafts.csswg.org/css-syntax/#at-keyword-token-diagram
		 */
		else if (
			code === t.COMMERCIAL_AT
			&& isWordStartNext()
		) {
			// consume valid atword
			consumeWordLike()
			node = new CSSAtWord(data.slice(open + 1, shut))
		}

		/**
		 * Consume a Word Token
		 * @see https://drafts.csswg.org/css-syntax/#ident-token-diagram
		 */
		else if (isWordStartNow()) {
			// consume valid word
			consumeWordLike()
			if (code === t.LEFT_PARENTHESIS) {
				node = new CSSFunctionWord(data.slice(open, shut++))
			} else {
				node = new CSSWord(data.slice(open, shut))
			}
		}

		/**
		 * Consume a Number Token
		 * @see https://drafts.csswg.org/css-syntax/#number-token-diagram
		 */
		else if (
			code === t.FULL_STOP
				? isNumberAfterFullStop(code)
				: code === t.PLUS_SIGN || code === t.HYPHEN_MINUS
					? isNumberAfterPlusMinus(code)
					: isDigitNow()
		) {
			// consume valid number
			while (true) {
				if (++shut < size) {
					code = data.charCodeAt(shut)
					if (isDigitNow()) continue
					if (code === t.FULL_STOP) {
						if (++shut < size && isNumberDecimal === false) {
							code = data.charCodeAt(shut)
							if (isDigitNow()) {
								isNumberDecimal = true
								continue
							}
						}
						shut -= 2
					} else if (code === t.LATIN_CAPITAL_LETTER_E || code === t.LATIN_SMALL_LETTER_E) {
						if (++shut < size && isNumberScientific === false) {
							code = data.charCodeAt(shut)
							if (isDigitNow()) {
								isNumberScientific = true
								continue
							}
							if (code === t.PLUS_SIGN || code === t.HYPHEN_MINUS) {
								if (++shut < size) {
									code = data.charCodeAt(shut)
									if (isDigitNow()) {
										isNumberScientific = true
										continue
									}
								}
								--shut
							}
						}
						shut -= 2
					}
				}
				break
			}
			node = new CSSNumber(data.slice(open, shut))
			open = shut
			// consume number unit
			if (code === t.PERCENT_SIGN) {
				node.unit = data[++shut]
			} else if (isWordStartNow()) {
				consumeWordLike()
				node.unit = data.slice(open, shut)
			}
		}

		/**
		 * Consume a Symbol Token
		 */
		else {
			// consume valid symbol
			shut += 1
			node = new CSSSymbol(data[shut])
		}

		read.node = node
		return true
	}

	function consumeWordLike() {
		while (++shut < size) {
			code = data.charCodeAt(shut)
			if (isWordNow()) continue
			break
		}
	}

	function isSpaceNow() {
		return (
			code === t.CHARACTER_TABULATION
			|| code === t.LINE_FEED
			|| code === t.FORM_FEED
			|| code === t.CARRIAGE_RETURN
			|| code === t.SPACE
		)
	}

	function isHashStart() {
		if (code === t.NUMBER_SIGN) {
			if (++shut < size) {
				code = data.charCodeAt(shut)
				if (isWordNow()) return true
				code = t.NUMBER_SIGN
			}
			--shut
		}
		return false
	}

	function isWordStartNext() {
		if (++shut < size) {
			save = code
			code = data.charCodeAt(shut)
			if (isWordStartNow()) return true
			code = save
		}
		--shut
		return false
	}

	function isDigitNow() {
		return (
			code <= t.DIGIT_NINE
			&& code >= t.DIGIT_ZERO
		)
	}

	/**
	 * Returns whether the current character starts word-like.
	 * @see https://drafts.csswg.org/css-syntax/#identifier-start-code-point
	 */
	function isWordStartNow() {
		switch (true) {
			case code === t.LOW_LINE:
			case code >= t.NON_ASCII:
			case code >= t.LATIN_SMALL_LETTER_A && code <= t.LATIN_SMALL_LETTER_Z:
			case code >= t.LATIN_CAPITAL_LETTER_A && code <= t.LATIN_CAPITAL_LETTER_Z:
				return true
			case code === t.REVERSE_SOLIDUS:
				if (++shut < size) {
					code = data.charCodeAt(shut)
					switch (true) {
						default:
							return true
						case code === t.LINE_FEED:
						case code === t.FORM_FEED:
						case code === t.CARRIAGE_RETURN:
					}
					code = t.REVERSE_SOLIDUS
				}
				--shut
				break
			case code === t.HYPHEN_MINUS:
				if (++shut < size) {
					code = data.charCodeAt(shut)
					switch (true) {
						case code === t.HYPHEN_MINUS:
						case isWordStartNow():
							return true
					}
					code = t.HYPHEN_MINUS
				}
				--shut
		}
		return false
	}

	/**
	 * Returns whether the current token is word-like.
	 * @see https://drafts.csswg.org/css-syntax/#identifier-start-code-point
	 */
	function isWordNow() {
		return (
			code === t.HYPHEN_MINUS
			|| (
				code >= t.DIGIT_ZERO
				&& code <= t.DIGIT_NINE
			)
			|| isWordStartNow()
		)
	}

	function isNumberAfterPlusMinus(save) {
		if (++shut < size) {
			code = data.charCodeAt(shut)
			switch (true) {
				case code === t.FULL_STOP:
					if (isNumberAfterFullStop(code)) return true
					break
				case isDigitNow():
					return true
			}
			code = save
		}
		--shut
		return false
	}

	function isNumberAfterFullStop(save) {
		if (++shut < size) {
			code = data.charCodeAt(shut)
			if (isDigitNow()) {
				isNumberDecimal = true
				return true
			}
		}
		code = save
		--shut
		return false
	}
}

function CSSComment(value) {
	this.prefix = `/*`
	this.value = value
	this.suffix = `*/`
} CSSComment.prototype.toString = function toString() {
	return [ this.prefix, this.value, this.suffix ].join(``)
}

function CSSSpace(value) {
	this.value = value
} CSSSpace.prototype.toString = function toString() {
	return [ this.value ].join(``)
}

function CSSString(value, quote) {
	quote = quote === `'` ? quote : `"`
	this.prefix = quote
	this.value = value
	this.suffix = quote
} CSSString.prototype.toString = function toString() {
	return [ this.prefix, this.value, this.suffix ].join(``)
}

function CSSNumber(value, unit) {
	this.value = value
	this.unit = unit == null ? `` : unit
} CSSNumber.prototype.toString = function toString() {
	return [ this.value, this.unit ].join(``)
}

function CSSWord(value) {
	this.value = value
} CSSWord.prototype.toString = function toString() {
	return [ this.value ].join(``)
}

function CSSFunctionWord(value) {
	this.value = value
	this.suffix = `(`
} CSSFunctionWord.prototype.toString = function toString() {
	return [ this.value, this.suffix ].join(``)
}

function CSSAtWord(value) {
	this.prefix = `@`
	this.value = value
} CSSAtWord.prototype.toString = function toString() {
	return [ this.prefix, this.value ].join(``)
}

function CSSHash(value) {
	this.prefix = `#`
	this.value = value
} CSSHash.prototype.toString = function toString() {
	return [ this.prefix, this.value ].join(``)
}

function CSSSymbol(value) {
	this.value = value
} CSSSymbol.prototype.toString = function toString() {
	return [ this.value ].join(``)
}
