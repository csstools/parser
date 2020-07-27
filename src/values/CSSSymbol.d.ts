import CSSToken from './CSSToken';

/**
 * ## CSSSymbol
 *
 * The CSSSymbol class is the token object for all symbols in CSS.
 */
export default class CSSSymbol extends CSSToken {
	constructor(value?: string) {}

	isCSSSymbol: true
	value: string
	unit: string
}
