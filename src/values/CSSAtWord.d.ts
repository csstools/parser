import CSSToken from './CSSToken';

/**
 * ## CSSAtWord
 *
 * The CSSAtWord class is the token object for all at-prefixed word in CSS.
 *
 * @class @extends {CSSToken}
 * @argument {string} value - Value of the at-prefixed word.
 */
export default class CSSAtWord extends CSSToken {
	constructor(value?: string) {}

	isCSSAtWord: true
	symbol: "@"
	value: string
}
