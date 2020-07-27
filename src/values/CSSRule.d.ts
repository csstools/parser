import CSSGroup from './CSSGroup';
import CSSValue from './CSSValue';

/**
 * ## CSSRule
 *
 * The CSSRule class is the container object for values that make up a rule.
 */
export default class CSSRule extends CSSGroup {
	constructor(items: CSSRuleItems) {
		this.items = items
	}

	isCSSRule: true
	items: CSSRuleItems
}

export interface CSSRuleItems {
	opening: CSSValue
	value: CSSValue[]
	closing: CSSValue
	extra: {
		betweenNameAndPrelude?: CSSValue
		betweenPreludeAndOpening?: CSSValue
	}
}
