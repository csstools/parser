import CSSRule from './CSSRule'
import CSSSymbol from './CSSSymbol'
import CSSValue from './CSSValue'
import CSSWord from './CSSWord'

/**
 * ## CSSAtRule
 *
 * The CSSAtRule class is the container object for values that make up an at-rule.
 */
export default class CSSAtRule<R extends CSSAtRuleRaw> extends CSSRule<R> {
	constructor(raw?: R)

	isCSSAtRule: true
	raw: R
}

export interface CSSAtRuleRaw<
	N extends CSSWord<string>,
	P extends CSSValue[],
	O extends CSSSymbol<'(' | '[' | '{'>,
	V extends CSSValue[],
	C extends CSSSymbol<')' | ']' | '}'>,
	NO extends (CSSComment<string, boolean> | CSSSpace<string>)[],
	PO extends (CSSComment<string, boolean> | CSSSpace<string>)[]
> {
	name?: N
	betweenNameAndOpening?: NO
	prelude?: P
	betweenPreludeAndOpening?: PO
	opening?: O
	value?: V
	closing?: C
}
