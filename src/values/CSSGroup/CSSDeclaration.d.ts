import CSSGroup from '../CSSGroup'
import CSSSymbol from './CSSSymbol'
import CSSValue from './CSSValue'
import CSSWord from './CSSWord'

/**
 * ## CSSDeclaration
 *
 * The CSSDeclaration class is the container of declarations in CSS.
 */
export default class CSSDeclaration<R extends CSSDeclarationRaw> extends CSSGroup<R> {
	constructor(raw?: R)

	isCSSDeclaration: true
	name: R["name"]["value"]
	value: string
	values: R["value"]
	priority: string
	raw: R
}

export interface CSSDeclarationRaw<
	N extends CSSWord<string>,
	O extends CSSSymbol<':'>,
	V extends CSSValue[],
	P extends CSSValue,
	C extends CSSSymbol<';'>,
	NO extends CSSValue[],
	OV extends CSSValue[],
	VP extends CSSValue[],
	VC extends CSSValue[]
> {
	name?: N
	betweenNameAndOpening?: NO
	opening?: O
	betweenOpeningAndValue?: OV
	value?: V
	betweenValueAndPriority?: VP
	priority?: P
	betweenValueAndClosing?: VC
	closing?: C
}
