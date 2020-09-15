import * as codes from './codes.js'

/**
 * Token Type Numeric Identifiers
 * @see https://drafts.csswg.org/css-syntax/#tokenization
 * ========================================================================== */

/**
 * Integer identifying a **Space** token (`<whitespace-token>`).
 * @see https://drafts.csswg.org/css-syntax/#whitespace-diagram
 */
export const SPACE_TYPE    = codes.SPACE // ␠ ===  9

/**
 * Integer identifying a **String** token (`<string-token>`).
 * @see https://drafts.csswg.org/css-syntax/#string-token-diagram
 */
export const STRING_TYPE   = codes.QUOTATION_MARK // " === 34

/**
 * Integer identifying a **Number** token (`<number-token>`, `<percentage-token>`, `<dimension-token>`).
 * @see https://drafts.csswg.org/css-syntax/#number-token-diagram
 */
export const NUMBER_TYPE   = codes.DIGIT_ZERO // 0 === 48

/**
 * Integer identifying an **AtWord** token (`<at-keyword-token>`).
 * @see https://drafts.csswg.org/css-syntax/#at-keyword-token-diagram
 */
export const ATWORD_TYPE   = codes.LATIN_CAPITAL_LETTER_A // A === 65

/**
 * Integer identifying a **Comment** token.
 * @see https://drafts.csswg.org/css-syntax/#comment-diagram
 */
export const COMMENT_TYPE  = codes.LATIN_CAPITAL_LETTER_C // C === 67

/**
 * Integer identifying a **Function** token (`<function-token>`).
 * @see https://drafts.csswg.org/css-syntax/#function-token-diagram
 */
export const FUNCTION_TYPE = codes.LATIN_CAPITAL_LETTER_F // F === 70

/**
 * Integer identifying a **Hash** token (`<hash-token>`).
 * @see https://drafts.csswg.org/css-syntax/#hash-token-diagram
 */
export const HASH_TYPE     = codes.LATIN_CAPITAL_LETTER_H // H === 72

/**
 * Integer identifying an **Word** token (`<ident-token>`).
 * @see https://drafts.csswg.org/css-syntax/#ident-token-diagram
 */
export const WORD_TYPE     = codes.LATIN_CAPITAL_LETTER_W // W === 87

/**
 * Integer identifying an **Word** token (`<ident-token>`).
 * @see https://drafts.csswg.org/css-syntax/#ident-token-diagram
 */
export const EOF_TYPE      = -1
