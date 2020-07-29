import { ATWORD_TYPE } from '../utils/token-types'
import CSSToken from './CSSToken';

/**
 * ## CSSAtWord
 *
 * The CSSAtWord class is the token object for all at-prefixed word in CSS.
 */
export default class CSSAtWord<V extends string> extends CSSToken {
	constructor(value?: V)

	isCSSAtWord: true
	symbol: "@"
	type: 0x0041
	value: V
}
