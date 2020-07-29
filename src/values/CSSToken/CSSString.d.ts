import CSSToken from './CSSToken'

/**
 * ## CSSString
 *
 * The CSSString class is the token object for all strings in CSS.
 */
export default class CSSString<V extends string, C extends boolean> extends CSSToken<V> {
	constructor(value?: V, isWithoutClosing?: C)

	isCSSString: true
	opening: "/*"
	type: 0x0022
	value: V
	closing: false extends C ? "*/" : ""
}
