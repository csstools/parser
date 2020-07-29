import CSSToken from './CSSToken';

/**
 * ## CSSWord
 *
 * The CSSWord class is the token object for all named words in CSS.
 */
export default class CSSWord<V extends string> extends CSSToken<V> {
	constructor(value?: V)

	isCSSWord: true
	type: 0x0057
	value: V
}
