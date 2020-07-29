import { COLA, BANG } from '../utils/code-points.js'
import { WORD_TYPE } from '../utils/token-types.js'
import { getSkippableSplicedValues, getSkippableValuesIndex, isIterating, isIteratingSkippableValues, withParent } from './consume.utils.js'
import CSSDeclaration from '../values/CSSGroup/CSSDeclaration.js'
import CSSPriority from '../values/CSSGroup/CSSPriority.js'
import consumeListOfValuesWhile from './consumeListOfValuesWhile.js'

/**
 * Consume a declaration from a prepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 * @see https://drafts.csswg.org/css-syntax/#consume-a-declaration
 */
export default function consumeDeclaration(iterator, parent) {
	const element = withParent(new CSSDeclaration({
		name:                    iterator.value,
		betweenNameAndOpening:   null,
		opening:                 null,
		betweenOpeningAndValue:  null,
		value:                   null,
		betweenValueAndPriority: null,
		priority:                null,
		closing:                 null,
		betweenValueAndClosing:  null,
	}), parent)
	const { raw } = element

	raw.betweenNameAndOpening = consumeListOfValuesWhile(iterator, element, isIteratingSkippableValues)

	// if the next value is anything other than a colon, return the incomplete element
	if (iterator.type !== COLA) return element

	// otherwise, consume the next input token
	raw.opening = withParent(iterator.value, element)

	raw.betweenOpeningAndValue = consumeListOfValuesWhile(iterator, element, isIteratingSkippableValues)

	// if the next value is null, return the incomplete element
	if (iterator.type === null) return element

	iterator.redo()

	raw.value = consumeListOfValuesWhile(iterator, element, isIterating)

	raw.betweenValueAndClosing = getSkippableSplicedValues(raw.value, raw.value.length - 1, -1)

	movePriorityValues()

	return element

	/**
	 * Move any "!important"-like tokens from the end of the value tokens to the declaration’s priority token.
	 */
	function movePriorityValues() {
		const { value } = raw
		let index = value.length - 1
		let node
		if (index > 0) {
			node = value[index]

			if (node.type === WORD_TYPE) {
				const skippableIndex = index = getSkippableValuesIndex(value, index - 1, -1)

				if (index >= 0) {
					node = value[index - 1]

					if (node.type === BANG) {
						assignPriorityNode(value, skippableIndex)

						raw.betweenValueAndPriority = value.splice(
							getSkippableValuesIndex(value, value.length - 1, -1)
						)
					}
				}
			}
		}
	}

	/**
	 *
	 * @param {CSSValue[]} values
	 * @param {number} skippableIndex
	 */
	function assignPriorityNode(values, skippableIndex) {
		const priorityValue = values.pop()
		const priorityBetweenSymbolAndValue = values.splice(skippableIndex)
		const prioritySymbol = values.pop()

		raw.priority = withParent(
			new CSSPriority({
				symbol:                prioritySymbol,
				betweenSymbolAndValue: priorityBetweenSymbolAndValue,
				value:                 priorityValue,
			}),
			element
		)
	}
}

consumeDeclaration.prepare = true

/** @typedef {import('../values').CSSValue} CSSValue */
