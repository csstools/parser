import CSSGroup from './CSSGroup';
import CSSValue from './CSSValue';

/**
 * ## CSSBlock
 *
 * The CSSGroup class is the bracketed container object for tokens and other groups with a shared context
 * within rounded brackets, square brackets, and curly brackets.
 */
export default class CSSBlock extends CSSGroup {
	constructor(items: CSSBlockItems) {
		this.items = items
	}

	isCSSBlock: true
	items: CSSBlockItems
}

export interface CSSBlockItems {
	opening: CSSValue
	value: CSSValue[]
	closing: CSSValue
}
