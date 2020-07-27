import { defineClass } from './CSSValue.utils.js'

export default function CSSValue() {}

defineClass(`CSSValue`, CSSValue, Object, {})

/**
 * ┏━━ CSSValue
 * ┃   ↓ ↓
 * ┗┳┳━━ CSSToken
 *  ┃┃   ↓ ↓
 *  ┃┗━┳━━ CSSAtWord
 *  ┃  ┣━━ CSSComment
 *  ┃  ┣━━ CSSFunctionWord
 *  ┃  ┣━━ CSSHash
 *  ┃  ┣━━ CSSNumber
 *  ┃  ┣━━ CSSSpace
 *  ┃  ┣━━ CSSString
 *  ┃  ┣━━ CSSSymbol
 *  ┃  ┗━━ CSSWord
 *  ┃
 *  ┗┳━━ CSSGroup
 *   ┃   ↓ ↓
 *   ┣━┳━━ CSSBlock
 *   ┃ ┃   ↓ ↓
 *   ┃ ┗━┏━━ CSSRule
 *   ┃   ┃   ↓ ↓
 *   ┃   ┣━┳━━ CSSAtRule
 *   ┃   ┃ ┗━━ CSSStyleRule
 *   ┃   ┃
 *   ┃   ┗━━ CSSDeclaration
 *   ┃
 *   ┗━━━━ CSSSelector
 */

/** @typedef {interface CSSValue {}} CSSValue */
