import { withParent } from './consume.utils.js'
import CSSAtRule from '../values/CSSAtRule.js'
import consumeRuleContents from './consumeRuleContents.js'

/**
 * Consume a CSS Rule from a prepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 * @argument {Consumer} [consumerOfListOfRuleValue]
 * @argument {Consumer} [consumeOfListOfRulePrelude]
 */
export default function consumeAtRule(iterator, parent, consumerOfListOfRuleValue, consumeOfListOfRulePrelude) {
	const element = withParent(new CSSAtRule({
		name:    iterator.value,
		prelude: null,
		opening: null,
		value:   null,
		closing: null,
		extra:   {
			betweenNameAndPrelude:    null,
			betweenPreludeAndOpening: null,
		},
	}), parent)

	return consumeRuleContents(iterator, element, consumerOfListOfRuleValue, consumeOfListOfRulePrelude)
}

consumeAtRule.prepare = true

/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
/** @typedef {import('../css-objects.js').Iterator} Iterator */
