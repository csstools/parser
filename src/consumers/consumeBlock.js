import { mirrorOf, withParent } from './consume.utils.js'
import consumeListOfValuesWhile from './consumeListOfValuesWhile.js'

/**
 * Consume the contents of a block from a prepared iterator with an opening type.
 * @argument {Iterator} iterator
 * @argument {CSSBlock} [element]
 */
export default function consumeBlock(iterator, element) {
	/** Mirror type of the current type. */
	const closingType = mirrorOf[iterator.type]

	// assign the parent source opening with the current value
	element.items.opening = withParent(iterator.value, element)

	// assign the parent source value with the list returned from the consumer
	element.items.value = consumeListOfValuesWhile(
		iterator,
		element,
		(innerIterator) => innerIterator.type !== closingType
	)

	if (iterator.type === closingType) {
		element.items.closing = withParent(iterator.value, element)
	}

	return element
}

consumeBlock.prepare = true

/** @typedef {import('../values/index.js').CSSBlock} CSSBlock */
/** @typedef {import('../css-objects.js').Iterator} Iterator */
