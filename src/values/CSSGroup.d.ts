
import CSSValue from './CSSValue'

/**
 * ## CSSGroup
 *
 * The CSSGroup class is the container object for tokens and other groups with a shared context;
 * and it is the foundational class for sheets, rules, selectors, declarations, and bracketed blocks.
 *
 * The CSSGroup class organizes objects into categories within its `items` property.
 * Objects that are not necessarily required, like boundary spaces, comments, or separator symbols, are found with its `extra` property.
 *
 * For example, a CSSDeclaration includes an `items.name` property which has a `CSSWord` value,
 * an `items.opening` property which has a `CSSSymbol` value (for the colon),
 * and then another `items.value` property which has an array of any of its group and token values.
 * Meanwhile, any spaces or comments between the colon and value are put into an `items.extra.betweenOpeningAndValue` property.
 */
export default class CSSGroup extends CSSValue {
	constructor(items: CSSGroupItems) {
		this.items = items
	}

	isCSSGroup: true
	source: CSSGroupSource
	type: typeof CSSGroup
}

export interface CSSGroupItems {
	value: CSSValue[]
}
