import CSSGroup from './CSSGroup'
import CSSValue from './CSSValue'

/**
 * ## CSSToken
 *
 * The CSSToken class is the foundational class for all syntactically significant objects in CSS;
 * which include comments, spaces, names, at-words, function-words, hashes, strings, numbers, and symbols.
 */
export default class CSSToken<V extends string> extends CSSValue {
	constructor(value?: V)

	isCSSToken: true
	parent?: CSSGroup<{ value: CSSValue[] }>
	source?: {
		line: number
		column: number
	}
	value?: V
}
