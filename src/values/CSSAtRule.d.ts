import CSSGroup from './CSSGroup';
import CSSValue from './CSSValue';

/**
 * ## CSSAtRule
 *
 * The CSSAtRule class is the container object for values that make up an at-rule.
 */
export default class CSSAtRule extends CSSGroup {
	constructor(items?: CSSAtRuleItems) {}

	isCSSAtRule: true
	items: CSSAtRuleItems
}

export interface CSSAtRuleItems {
	name: CSSValue
	opening: CSSValue
	value?: CSSValue[]
	closing: CSSValue
	extra: {
		betweenNameAndPrelude?: CSSValue[]
		betweenPreludeAndOpening?: CSSValue[]
	}
}
