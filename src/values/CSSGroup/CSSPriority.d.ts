import CSSComment from './CSSComment'
import CSSGroup from '../CSSGroup'
import CSSSpace from './CSSSpace'
import CSSSymbol from './CSSSymbol'
import CSSValue from './CSSValue'

/**
 * ## CSSPriority
 *
 * The CSSPriority class is the container object for the priority of a declaration value.
 */
export default class CSSPriority<R extends CSSPriorityRaw> extends CSSValue {
	constructor(raw?: R)

	isCSSPriority: true
	raw: R
}

export interface CSSPriorityRaw<
	S extends CSSSymbol<'!'>,
	V extends CSSValue,
	SV extends (CSSComment<string, boolean> | CSSSpace<string>)[]
> {
	symbol?: S
	betweenSymbolAndValue?: SV
	value?: V
}
