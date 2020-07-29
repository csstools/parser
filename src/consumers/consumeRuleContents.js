import { createIterator, getSkippableSplicedValues, isIteratingNonCurlyBracketedBlockStarts, withParent } from './consume.utils.js'
import { L_CB } from '../utils/code-points.js'
import consumeBlock from './consumeBlock.js'
import consumeListOfValuesWhile from './consumeListOfValuesWhile.js'

/**
 * Consume the contents of a CSS Rule from an unprepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 * @argument {Consumer} [consumerOfListOfRuleValue]
 */
export default function consumeRuleContents(iterator, element, consumerOfListOfRuleValue) {
	const { raw } = element
	const prelude = raw.prelude = consumeListOfValuesWhile(iterator, element, isIteratingNonCurlyBracketedBlockStarts)

	raw.betweenNameAndPrelude = getSkippableSplicedValues(prelude, 0, 1)
	raw.betweenPreludeAndOpening = getSkippableSplicedValues(prelude, prelude.length - 1, -1)

	// consume the rule block
	const { value } = iterator
	switch (true) {
		case iterator.type === L_CB:
			consumeBlock(iterator, element)
			break

		case value.openingType === L_CB:
			raw.opening = withParent(value.raw.opening, element)
			raw.value = value.raw.value
			raw.closing = withParent(value.raw.closing, element)
	}

	if (
		typeof consumerOfListOfRuleValue === `function`
		&& raw.value
	) {
		raw.value = consumerOfListOfRuleValue(
			createIterator(raw.value),
			element
		)
	}

	return element
}
