import { mirrorOf, withParent } from './consume.utils.js'
import consumeListOfValuesWhile from './consumeListOfValuesWhile.js'

/**
 * Consume the contents of a block from a prepared iterator with an opening type.
 * @argument {Iterator} iterator
 * @argument {E} [element]
 * @template {CSSBlock<{ opening: CSSSymbol<string>, value: CSSValue[], closing: CSSSymbol<string> }>} E
 */
export default function consumeBlock(iterator, element) {
	/** Mirror type of the current type. */
	const closingType = mirrorOf[iterator.type]

	// assign the parent source opening with the current value
	element.raw.opening = withParent(iterator.value, element)

	// assign the parent source value with the list returned from the consumer
	element.raw.value = consumeListOfValuesWhile(
		iterator,
		element,
		(innerIterator) => innerIterator.type !== closingType
	)

	if (iterator.type === closingType) {
		element.raw.closing = withParent(iterator.value, element)
	}

	return element
}

consumeBlock.prepare = true

/** @typedef {import('../values').CSSBlock} CSSBlock */
/** @typedef {import('../values').CSSSymbol} CSSSymbol */
/** @typedef {import('../values').CSSToken} CSSToken */
/** @typedef {import('../values').CSSValue} CSSValue */
/** @typedef {import('../tokenize/tokenize.js').Iterator} Iterator */
