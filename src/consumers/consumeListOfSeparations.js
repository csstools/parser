import consumeSeparation from './consumeSeparation.js'

/**
 * Consume a list of separations from an unprepared iterator.
 * @argument {*} iterator
 * @argument {*} parent
 * @argument {*} isSeparator
 * @argument {*} consumerOfSeparationValue
 */
export default function consumeListOfSeparations(iterator, parent, isSeparator, consumerOfSeparationValue) {
	/** @type {CSSSeparation[]} */
	const listOfSeparations = []

	// repeatedly consume the next input token
	while (iterator() === true) {
		listOfSeparations.push(
			consumeSeparation(
				iterator,
				parent,
				isSeparator,
				consumerOfSeparationValue
			)
		)
	}

	return listOfSeparations
}

/** @typedef {import('./css-objects.js').Consumer} Consumer */
/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
/** @typedef {import('../values/index.js').CSSSeparation} CSSSeparation */
/** @typedef {import('./cssom').Iterator} Iterator */
