import CSSComment from './CSSComment'
import CSSGroup from './CSSGroup'
import CSSSpace from './CSSSpace'
import CSSToken from './CSSToken'
import CSSValue from './CSSValue'

/**
 * ## CSSSeparation
 *
 * The CSSSeparation class is the container object for values that make up a rule.
 */
export default class CSSSeparation<R extends CSSSeparationRaw> extends CSSGroup<R> {
	constructor(raw?: R)

	isCSSSeparation: true
	separator: R["separator"]["value"]
	value: string
	values: R["value"]
	raw: R
}

export interface CSSSeparationRaw<
	S extends CSSToken<string>,
	V extends CSSValue[],
	BV extends (CSSComment<string, boolean> | CSSSpace<string>)[],
	AV extends (CSSComment<string, boolean> | CSSSpace<string>)[]
> {
	separator?: S
	beforeValue?: BV
	value?: V
	afterValue?: AV
}
