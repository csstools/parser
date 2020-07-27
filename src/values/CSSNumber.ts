import CSSToken from './CSSToken';

/**
 * ## CSSNumber
 *
 * The CSSNumber class is the token object for all numeric values in CSS.
 */
export default class CSSNumber extends CSSToken {
	constructor(value?: string, unit?: string) {}

	isCSSNumber: true
	symbol: "#"
	value: string
	unit: string
}
