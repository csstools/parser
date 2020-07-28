import { createIterator, getSkippableSplicedValues, isIteratingSkippableValues, withParent } from './consume.utils.js'
import CSSSeparatedGroup from '../values/CSSSeparation.js'
import consumeListOfValuesWhile from './consumeListOfValuesWhile.js'

/**
 * Consume a list of selectors from an prepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 */
export default function consumeSeparation(iterator, parent, isSeparator, consumerOfSeparationValue) {
	const raw = {
		separator:   null,
		beforeValue: null,
		value:       null,
		afterValue:  null,
	}
	const element = withParent(new CSSSeparatedGroup(raw), parent)

	// potentially consume the separator
	if (isSeparator(iterator)) raw.separator = iterator.value
	else iterator.redo()

	// consume skippable values between the separator and the value
	raw.beforeValue = consumeListOfValuesWhile(iterator, parent, isIteratingSkippableValues)

	iterator.redo()

	// consume values until another skippable value is reached
	raw.value = consumeListOfValuesWhile(
		iterator,
		parent,
		(innerIterator) => !isSeparator(innerIterator)
	)

	// move ending skippable values
	raw.afterValue = getSkippableSplicedValues(raw.value, raw.value.length - 1, -1)

	if (typeof consumerOfSeparationValue === `function`) {
		raw.value = consumerOfSeparationValue(
			createIterator(raw.value, true),
			element
		)
	}

	if (isSeparator(iterator)) iterator.redo()

	return element
}

consumeSeparation.prepare = true
