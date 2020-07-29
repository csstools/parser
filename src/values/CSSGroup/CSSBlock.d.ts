import CSSGroup from '../CSSGroup'
import CSSSymbol from './CSSSymbol'
import CSSValue from './CSSValue'

/**
 * ## CSSBlock
 *
 * The CSSGroup class is the bracketed container object for tokens and other groups with a shared context
 * within rounded brackets, square brackets, and curly brackets.
 */
export default class CSSBlock<R extends CSSBlockRaw> extends CSSGroup<R> {
	constructor(raw?: R)

	isCSSBlock: true
	raw: R
}

export interface CSSBlockRaw<
	O extends CSSSymbol<'(' | '[' | '{'>,
	V extends CSSValue[],
	C extends CSSSymbol<')' | ']' | '}'>
> {
	opening?: O
	value?: V
	closing?: C
}
