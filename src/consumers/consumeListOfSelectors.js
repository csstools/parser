import { isIteratingCommaValue } from './consume.utils.js'
import consumeListOfSeparations from './consumeListOfSeparations.js'
import consumeSelector from './consumeSelector.js'

/**
 * Consume a list of selectors from an unprepared iterator.
 * @param {Iterator} iterator
 * @param {CSSGroup} parent
 */
export default function consumeListOfSelectors(iterator, parent) {
	return consumeListOfSeparations(iterator, parent, isIteratingCommaValue, consumeSelector)
}

/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
/** @typedef {import('./cssom').Iterator} Iterator */
