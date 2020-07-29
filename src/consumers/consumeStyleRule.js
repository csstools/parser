import { withParent } from './consume.utils.js'
import CSSStyleRule from '../values/CSSGroup/CSSStyleRule.js'
import consumeListOfStyleRuleValues from './consumeListOfStyleRuleValues.js'
import consumeRuleContents from './consumeRuleContents.js'

/**
 * Consume a CSS Style Rule from a prepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 */
export default function consumeStyleRule(iterator, parent) {
	const element = withParent(new CSSStyleRule({
		prelude:                  null,
		betweenPreludeAndOpening: null,
		opening:                  null,
		value:                    null,
		closing:                  null,
	}), parent)

	iterator.redo()

	return consumeRuleContents(iterator, element, consumeListOfStyleRuleValues)
}

consumeStyleRule.prepare = true

/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
/** @typedef {import('../css-objects.js').Iterator} Iterator */
