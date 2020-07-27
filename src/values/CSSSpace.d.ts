import CSSToken from './CSSToken';

/**
 * ## CSSSpace
 *
 * The CSSSpace class is the token object for all space values in CSS.
 */
export default class CSSSpace extends CSSToken {
	constructor(value?: string) {}

	isCSSSpace: true
	value: string
	unit: string
}
