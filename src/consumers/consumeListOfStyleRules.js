import { COMMENT_TYPE, SPACE_TYPE, ATWORD_TYPE } from '../utils/token-types.js'
import { withParent } from './consume.utils.js'
import consumeAtRule from './consumeAtRule.js'
import consumeListOfStyleRuleValues from './consumeListOfStyleRuleValues.js'
import consumeRule from './consumeRule.js'

/**
 * Consume a list of rules from an unprepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 */
export default function consumeListOfStyleRules(iterator, parent) {
	/** @type {CSSValue[]} */
	const listOfRules = []

	// repeatedly consume the next input token
	while (iterator() === true) {
		switch (iterator.type) {
			case COMMENT_TYPE:
			case SPACE_TYPE:
				listOfRules.push(withParent(iterator.value, parent))
				break

			case ATWORD_TYPE:
				listOfRules.push(
					consumeAtRule(
						iterator,
						parent,
						consumeListOfStyleRules
					)
				)
				break

			default:
				listOfRules.push(
					consumeRule(
						iterator,
						parent,
						consumeListOfStyleRuleValues
					)
				)
		}
	}

	return listOfRules
}

/** @typedef {import('./css-objects.js').Consumer} Consumer */
/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
/** @typedef {import('../values/index.js').CSSValue} CSSValue */
/** @typedef {import('./cssom').Iterator} Iterator */
