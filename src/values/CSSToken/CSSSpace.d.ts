import CSSToken from './CSSToken'

/**
 * ## CSSSpace
 *
 * The CSSSpace class is the token object for all space values in CSS.
 */
export default class CSSSpace<V extends string> extends CSSToken<V> {
	constructor(value?: V)

	isCSSSymbol: true
	type: 0x0009
	value: V
}
