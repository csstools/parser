import { isIterating } from './consume.utils.js'
import consumeListOfValuesWhile from './consumeListOfValuesWhile.js'

/**
 * Consume a list of values.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 */
export default function consumeListOfValues(iterator, parent) {
	return consumeListOfValuesWhile(iterator, parent, isIterating)
}

/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
