import CSSFunctionWord from './CSSFunctionWord'
import CSSGroup from '../CSSGroup'
import CSSSymbol from './CSSSymbol'
import CSSValue from './CSSValue'

/**
 * ## CSSFunction
 *
 * The CSSFunction class is the container object for functions in CSS.
 */
export default class CSSFunction<R extends CSSFunctionRaw> extends CSSGroup<R> {
	constructor(raw?: R)

	isCSSFunction: true
	name: R["opening"]["value"]
	opening: R["opening"]["symbol"]
	closing: R["closing"]["value"]
	value: string
	values: R["value"]
	raw: R
}

export interface CSSFunctionRaw<
	O extends CSSFunctionWord<string>,
	V extends CSSValue[],
	C extends CSSSymbol<')'>,
> {
	opening?: O
	value?: V
	closing?: C
}
