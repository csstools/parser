import CSSToken from './CSSToken';

/**
 * ## CSSNumber
 *
 * The CSSNumber class is the token object for all numeric values in CSS.
 */
export default class CSSNumber<V extends string, U extends string> extends CSSToken<V> {
	constructor(value?: V, unit?: U)

	isCSSNumber: true
	type: 0x0030
	value: V
	unit: U
}
