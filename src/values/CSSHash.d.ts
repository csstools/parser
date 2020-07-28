import CSSToken from './CSSToken';

/**
 * ## CSSHash
 *
 * The CSSHash class is the token object for all hashes in CSS.
 */
export default class CSSHash<V extends string> extends CSSToken {
	constructor(value?: V)

	isCSSHash: true
	symbol: "#"
	type: 0x0048
	value: V
}
