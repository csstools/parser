import consumeValue from './consumeValue.js'

/**
 * Consume a list from an unprepared iterator while a callback is true, returning the consumed list.
 * @argument {Iterator} iterator - Current iterator.
 * @argument {CSSGroup} [parent] - Current container object.
 * @argument {CallbackFunction} callbackFn - A function that accepts the iterator argument and stop the iterator when it returns true.
 */
export default function consumeListOfValuesWhile(iterator, parent, callbackFn) {
	/** @type {CSSValue[]} */
	const listOfValues = []

	// repeatedly advance the iterator
	while (iterator() === true) {
		switch (true) {
			// if the callback returns true
			case callbackFn(iterator):
				// push the iterator value into the list of nodes
				listOfValues.push(consumeValue(iterator, parent))
				// and continue
				continue

			// if the iterator value does not have the true prop
			default:
				// stop advancing the iterator
		}

		break
	}

	// return the list of values
	return listOfValues
}

/** @typedef {(iterator?: Iterator) => unknown} CallbackFunction */
/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
/** @typedef {import('../values/index.js').CSSValue} CSSValue */
/** @typedef {import('../css-objects.js').Iterator} Iterator */
