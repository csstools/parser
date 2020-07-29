import CSSComment from './CSSComment'
import CSSGroup from '../CSSGroup'
import CSSSpace from './CSSSpace'
import CSSSymbol from './CSSSymbol'
import CSSValue from './CSSValue'

/**
 * ## CSSRule
 *
 * The CSSRule class is the container object for values that make up a rule.
 */
export default class CSSRule<R extends CSSRuleRaw> extends CSSGroup<R> {
	constructor(raw?: R)

	isCSSRule: true
	raw: R
}

export interface CSSRuleRaw<
	P extends CSSValue[],
	O extends CSSSymbol<'(' | '[' | '{'>,
	V extends CSSValue[],
	C extends CSSSymbol<')' | ']' | '}'>,
	PO extends (CSSComment<string, boolean> | CSSSpace<string>)[]
> {
	prelude?: P
	betweenPreludeAndOpening?: PO
	opening?: O
	value?: V
	closing?: C
}
