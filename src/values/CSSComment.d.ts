import CSSToken from './CSSToken';

/**
 * ## CSSComment
 *
 * The CSSComment class is the token object for all comments in CSS.
 */
export default class CSSComment extends CSSToken {
	constructor(value?: string, isWithoutClosing?: boolean) {}

	isCSSComment: true
	opening: "/*"
	value: string
	closing: "" | "*/"
}
