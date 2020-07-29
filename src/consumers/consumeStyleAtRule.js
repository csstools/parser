import { withParent } from './consume.utils.js'
import CSSAtRule from '../values/CSSGroup/CSSAtRule.js'
import consumeRuleContents from './consumeRuleContents.js'
import consumeListOfStyleRules from './consumeListOfStyleRules.js'

/**
 * Consume a CSS Rule from a prepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 */
export default function consumeStyleAtRule(iterator, parent) {
	const element = withParent(new CSSAtRule({
		name:                     iterator.value,
		prelude:                  null,
		betweenPreludeAndOpening: null,
		opening:                  null,
		value:                    null,
		closing:                  null,
	}), parent)

	return consumeRuleContents(iterator, element, consumeListOfStyleRules)
}

consumeStyleAtRule.prepare = true

/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
/** @typedef {import('../css-objects.js').Iterator} Iterator */
