import CSSStyleSheet from '../values/CSSGroup/CSSStyleSheet.js'
import consumeListOfStyleRules from './consumeListOfStyleRules.js'

/**
 * Consume a value from an unprepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} [parent]
 */
export default function consumeStyleSheet(iterator) {
	const element = new CSSStyleSheet({ value: null })
	element.raw.value = consumeListOfStyleRules(iterator, element)
	return element
}

/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
/** @typedef {import('../css-objects.js').Iterator} Iterator */
