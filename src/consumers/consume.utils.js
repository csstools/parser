import { COLA, L_CB, L_RB, L_SB, R_CB, R_RB, R_SB, SEMI, COMA } from '../utils/code-points.js'
import { COMMENT_TYPE, FUNCTION_TYPE, SPACE_TYPE } from '../utils/token-types.js'

/**
 * Returns whether a string is an ascii case-insensitive match for "important".
 */
export const isImportantValue = RegExp.prototype.test.bind(/^important$/i)

/**
 * Assigns a parent to the returned value.
 * @argument {V} value
 * @argument {CSSGroup} parent
 * @template V
 */
export function withParent(value, parent) {
	value.parent = parent

	return value
}

/**
 * @type {{ [key: number]: number }} Mirror variant of the numeric type.
 */
export const mirrorOf = {}

mirrorOf[COLA] = SEMI
mirrorOf[L_RB] = R_RB
mirrorOf[L_SB] = R_SB
mirrorOf[L_CB] = R_CB
mirrorOf[FUNCTION_TYPE] = R_RB

/**
 * Returns true, as long as the iterator is iterating.
 * @argument {Iterator} iterator
 */
export function isIterating() {
	return true
}

/**
 * Returns whether the iterator is currently a non-semi value.
 * @argument {Iterator} iterator
 */
export function isIteratingNonSemis(iterator) {
	return iterator.type !== SEMI
}

/**
 * Returns whether the iterator is currently a skippable value.
 * @argument {Iterator} iterator
 */
export function isIteratingSkippableValues(iterator) {
	const { type } = iterator

	return type === COMMENT_TYPE || type === SPACE_TYPE
}

/**
 * Returns whether the iterator is not the start of a curly-bracketed block.
 * @argument {Iterator} iterator
 */
export function isIteratingNonCurlyBracketedBlockStarts(iterator) {
	return (
		iterator.type !== L_CB
		&& iterator.value.openingType !== L_CB
	)
}

/**
 * Returns whether the iterator value is a comma.
 * @argument {Iterator} iterator
 */
export function isIteratingCommaValue(iterator) {
	return iterator.type === COMA
}

/**
 * Returns the splice index to trim skippable values from an array.
 * @argument {CSSValue[]} array
 * @argument {number} startingIndex
 * @argument {number} incremement
 */
export function getSkippableValuesIndex(array, startingIndex, incremement) {
	const min = 0
	const max = array.length
	let index = Math.min(startingIndex, max)
	for (; index >= min && index < max; index += incremement) {
		switch (array[index].type) {
			case COMMENT_TYPE:
			case SPACE_TYPE:
				continue
			default:
		}
		break
	}
	return incremement >= 0 ? index : Math.min(index + 1, max)
}

/**
 * Returns the spliced, skippable values from an array.
 * @argument {CSSValue[]} array
 * @argument {number} startingIndex
 * @argument {number} incremement
 */
export function getSkippableSplicedValues(array, startingIndex, incremement) {
	const skippableValuesIndex = getSkippableValuesIndex(array, startingIndex, incremement)

	return incremement >= 0 ? array.splice(0, skippableValuesIndex) : array.splice(skippableValuesIndex)
}

/**
 * Creates an iterator
 * @argument {CSSValue[]} cache - List of nodes or list to consume nodes.
 * @argument {boolean} doIteration - Whether to iterate before returning the iterator.
 */
export function createIterator(nodes, doIteration) {
	let wait = false
	let size = nodes.length

	iterator.push = push
	iterator.redo = redo

	if (doIteration === true) iterator()

	return iterator

	function iterator() {
		if (wait === true) {
			wait = false

			return true
		}

		if (size === 0) {
			return false
		}

		--size

		iterator.value = nodes.shift()
		iterator.type = iterator.value.type

		return true
	}

	function push(value) {
		size = nodes.push(value)
	}

	/**
	 * Holds the current iterator value during its next iteration.
	 * @returns {true}
	 */
	function redo() {
		return wait = true
	}
}

/** @typedef {import('../css-objects.js').Iterator} Iterator */
/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
/** @typedef {import('../values/index.js').CSSValue} CSSValue */
