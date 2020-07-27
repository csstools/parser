import { COLA, L_CB, L_RB, L_SB, R_CB, R_RB, R_SB, SEMI } from './code-points.js'

/**
 * Token Type Numeric Identifiers
 * @see https://drafts.csswg.org/css-syntax/#tokenization
 * ========================================================================== */

/**
 * Integer identifying a **Space** token (`<whitespace-token>`).
 * @see https://drafts.csswg.org/css-syntax/#whitespace-diagram
 */
export const SPACE_TYPE    = 0x0009 // ␠ ===  9

/**
 * Integer identifying a **String** token (`<string-token>`).
 * @see https://drafts.csswg.org/css-syntax/#string-token-diagram
 */
export const STRING_TYPE   = 0x0022 // " === 34

/**
 * Integer identifying a **Number** token (`<number-token>`, `<percentage-token>`, `<dimension-token>`).
 * @see https://drafts.csswg.org/css-syntax/#number-token-diagram
 */
export const NUMBER_TYPE   = 0x0030 // 0 === 48

/**
 * Integer identifying an **AtWord** token (`<at-keyword-token>`).
 * @see https://drafts.csswg.org/css-syntax/#at-keyword-token-diagram
 */
export const ATWORD_TYPE   = 0x0041 // A === 65

/**
 * Integer identifying a **Comment** token.
 * @see https://drafts.csswg.org/css-syntax/#comment-diagram
 */
export const COMMENT_TYPE  = 0x0043 // C === 67

/**
 * Integer identifying a **Function** token (`<function-token>`).
 * @see https://drafts.csswg.org/css-syntax/#function-token-diagram
 */
export const FUNCTION_TYPE = 0x0046 // F === 70

/**
 * Integer identifying a **Hash** token (`<hash-token>`).
 * @see https://drafts.csswg.org/css-syntax/#hash-token-diagram
 */
export const HASH_TYPE     = 0x0048 // H === 72

/**
 * Integer identifying an **Word** token (`<ident-token>`).
 * @see https://drafts.csswg.org/css-syntax/#ident-token-diagram
 */
export const WORD_TYPE     = 0x0057 // W === 87

/**
 * @type {{ [key: number]: number }} Mirror variant of token type.
 */
export const mirrorOf = {}

mirrorOf[COLA] = SEMI
mirrorOf[L_RB] = R_RB
mirrorOf[L_SB] = R_SB
mirrorOf[L_CB] = R_CB
mirrorOf[FUNCTION_TYPE] = R_RB
