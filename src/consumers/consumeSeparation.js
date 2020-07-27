import consumeListOfValuesWhile from './consumeListOfValuesWhile.js'
import CSSSeparatedGroup from '../values/CSSSeparation.js'
import { createIterator, getSkippableSplicedValues, isIteratingSkippableValues, withParent } from './consume.utils.js'

/**
 * Consume a list of selectors from an prepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 */
export default function consumeSeparation(iterator, parent, isSeparator, consumerOfSeparationValue) {
	const extra = {
		beforeValue: null,
		afterValue:  null,
	}
	const items = {
		separator: null,
		value:     null,
		extra,
	}
	const element = withParent(new CSSSeparatedGroup(items), parent)

	// potentially consume the separator
	if (isSeparator(iterator)) items.separator = iterator.value
	else iterator.redo()

	// consume skippable values between the separator and the value
	extra.beforeValue = consumeListOfValuesWhile(iterator, parent, isIteratingSkippableValues)

	iterator.redo()

	// consume values until another skippable value is reached
	items.value = consumeListOfValuesWhile(
		iterator,
		parent,
		(innerIterator) => !isSeparator(innerIterator)
	)

	// move ending skippable values
	extra.afterValue = getSkippableSplicedValues(items.value, items.value.length - 1, -1)

	if (typeof consumerOfSeparationValue === `function`) {
		items.value = consumerOfSeparationValue(
			createIterator(items.value, true),
			element
		)
	}

	if (isSeparator(iterator)) iterator.redo()

	return element
}

consumeSeparation.prepare = true
