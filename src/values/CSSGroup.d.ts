import CSSValue from './CSSValue'

/**
 * ## CSSGroup
 *
 * The CSSGroup class is the container object for tokens and other groups with a shared context;
 * and it is the foundational class for sheets, rules, selectors, declarations, and bracketed blocks.
 *
 * The CSSGroup class organizes objects into categories within its `raw` property.
 *s
 * For example, a CSSDeclaration includes an `raw.name` property which has a `CSSWord` value,
 * an `raw.opening` property which has a `CSSSymbol` value (for the colon),
 * and then another `raw.value` property which has an array of any of its group and token values.
 * Meanwhile, any spaces or comments between the colon and value are put into an `raw.betweenOpeningAndValue` property.
 */
export default class CSSGroup<R extends CSSGroupRaw> extends CSSValue {
	constructor(raw?: R)

	isCSSGroup: true
	parent?: CSSGroup<{ value: CSSValue[] }>
	raw: R
}

export interface CSSGroupRaw<
	V extends CSSValue[]
> {
	value?: V
}
