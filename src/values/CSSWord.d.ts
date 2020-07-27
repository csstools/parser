import CSSToken from './CSSToken';

/**
 * ## CSSWord
 *
 * The CSSWord class is the token object for all named words in CSS.
 */
export default class CSSWord extends CSSToken {
	constructor(value?: string) {}

	isCSSWord: true
	value: string
	unit: string
}
