import CSSToken from './CSSToken';

/**
 * ## CSSFunctionWord
 *
 * The CSSFunctionWord class is the token object for all function words in CSS.
 */
export default class CSSFunctionWord extends CSSToken {
	constructor(value?: string) {}

	isCSSFunctionWord: true
	value: string
	symbol: "("
}
