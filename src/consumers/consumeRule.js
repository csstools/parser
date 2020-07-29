import { withParent } from './consume.utils.js'
import CSSStyleRule from '../values/CSSGroup/CSSStyleRule.js'
import consumeRuleContents from './consumeRuleContents.js'

/**
 * Consume a CSS Rule from a prepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 * @argument {Consumer} [consumerOfListOfRuleValue]
 * @argument {Consumer} [consumeOfListOfRulePrelude]
 */
export default function consumeRule(iterator, parent, consumerOfListOfRuleValue, consumeOfListOfRulePrelude) {
	const element = withParent(new CSSStyleRule({
		prelude:                  null,
		betweenPreludeAndOpening: null,
		opening:                  null,
		value:                    null,
		closing:                  null,
	}), parent)

	iterator.redo()

	return consumeRuleContents(
		iterator,
		element,
		consumerOfListOfRuleValue,
		consumeOfListOfRulePrelude
	)
}

consumeRule.prepare = true

/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
/** @typedef {import('../css-objects.js').Iterator} Iterator */
