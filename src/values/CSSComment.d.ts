import CSSToken from './CSSToken';

/**
 * ## CSSComment
 *
 * The CSSComment class is the token object for all comments in CSS.
 */
export default class CSSComment<V extends string, C extends boolean> extends CSSToken {
	constructor(value?: V, isWithoutClosing?: C)

	isCSSComment: true
	opening: "/*"
	type: 0x0043
	value: V
	closing: false extends C ? "*/" : ""
}
