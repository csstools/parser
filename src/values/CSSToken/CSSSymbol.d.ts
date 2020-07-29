import CSSToken from './CSSToken'

/**
 * ## CSSSymbol
 *
 * The CSSSymbol class is the token object for all symbols in CSS.
 */
export default class CSSSymbol<V extends string> extends CSSToken<V> {
	constructor(value?: V)

	isCSSSymbol: true
	type: number
	value: V
}
