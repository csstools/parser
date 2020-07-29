import { withParent } from './consume.utils.js'
import CSSAtRule from '../values/CSSGroup/CSSAtRule.js'
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
		name:                     iterator.value,
		betweenNameAndOpening:    null,
		prelude:                  null,
		betweenPreludeAndOpening: null,
		opening:                  null,
		value:                    null,
		closing:                  null,
	}), parent)

	return consumeRuleContents(iterator, element, consumerOfListOfRuleValue, consumeOfListOfRulePrelude)
}

consumeAtRule.prepare = true

/** @typedef {import('../values/index.js').CSSGroup<{ value: CSSAtRule<{ name: CSSWord<string>, prelude: CSSValue[], opening: CSSSymbol, closing: CSSSymbol }> }>} CSSGroup */
/** @typedef {import('../values/index.js').CSSWord<string>} CSSWord */
/** @typedef {import('../values/index.js').CSSValue} CSSValue */
/** @typedef {import('../values/index.js').CSSSymbol<string>} CSSSymbol */
/** @typedef {import('../tokenize/tokenize.js').Iterator} Iterator */
