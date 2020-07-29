import CSSGroup from '../CSSGroup'
import CSSSymbol from './CSSSymbol'
import CSSValue from './CSSValue'

/**
 * ## CSSStyleSheet
 *
 * The CSSStyleSheet class is the container of styled rules in CSS.
 */
export default class CSSStyleSheet<R extends CSSStyleSheetRaw> extends CSSGroup<R> {
	constructor(raw?: R)

	isCSSStyleSheet: true
	raw: R
}

export interface CSSStyleSheetRaw<
	V extends CSSValue[]
> {
	value?: V
}
