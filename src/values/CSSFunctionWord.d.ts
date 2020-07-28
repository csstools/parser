import CSSToken from './CSSToken';

/**
 * ## CSSFunctionWord
 *
 * The CSSFunctionWord class is the token object for all function words in CSS.
 */
export default class CSSFunctionWord<V extends string> extends CSSToken {
	constructor(value?: V)

	isCSSFunctionWord: true
	type: 0x0046
	value: V
	symbol: "("
}
