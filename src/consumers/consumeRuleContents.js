import { createIterator, getSkippableSplicedValues, isIteratingNonCurlyBracketedBlockStarts, withParent } from './consume.utils.js'
import { L_CB } from '../code-points.js'
import consumeBlock from './consumeBlock.js'
import consumeListOfValuesWhile from './consumeListOfValuesWhile.js'

/**
 * Consume the contents of a CSS Rule from an unprepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 * @argument {Consumer} [consumerOfListOfRuleValue]
 * @argument {Consumer} [consumeOfListOfRulePrelude]
 */
export default function consumeRuleContents(iterator, element, consumerOfListOfRuleValue, consumeOfListOfRulePrelude) {
	const { items } = element
	const prelude = items.prelude = consumeListOfValuesWhile(iterator, element, isIteratingNonCurlyBracketedBlockStarts)

	items.extra.betweenNameAndPrelude = getSkippableSplicedValues(prelude, 0, 1)
	items.extra.betweenPreludeAndOpening = getSkippableSplicedValues(prelude, prelude.length - 1, -1)

	if (typeof consumeOfListOfRulePrelude === `function`) {
		items.prelude = consumeOfListOfRulePrelude(
			createIterator(prelude),
			element
		)
	}

	// consume the rule block
	const { value } = iterator
	switch (true) {
		case iterator.type === L_CB:
			consumeBlock(iterator, element)
			break

		case value.openingType === L_CB:
			items.opening = withParent(value.items.opening, element)
			items.value = value.items.value
			items.closing = withParent(value.items.closing, element)
	}

	if (
		typeof consumerOfListOfRuleValue === `function`
		&& items.value
	) {
		items.value = consumerOfListOfRuleValue(
			createIterator(items.value),
			element
		)
	}

	return element
}
