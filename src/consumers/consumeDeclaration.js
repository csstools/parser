import { COLA, BANG } from '../utils/code-points.js'
import { WORD_TYPE } from '../utils/token-types.js'
import { getSkippableSplicedValues, getSkippableValuesIndex, isImportantValue, isIterating, isIteratingSkippableValues, withParent } from './consume.utils.js'
import CSSDeclaration from '../values/CSSDeclaration.js'
import CSSDeclarationImportant from '../values/CSSDeclarationImportant.js'
import consumeListOfValuesWhile from './consumeListOfValuesWhile.js'

/**
 * Consume a declaration from a prepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 * @see https://drafts.csswg.org/css-syntax/#consume-a-declaration
 */
export default function consumeDeclaration(iterator, parent) {
	const extra = {
		betweenNameAndOpening:    null,
		betweenOpeningAndValue:   null,
		betweenValueAndImportant: null,
		betweenValueAndClosing:   null,
	}
	const items = {
		name:    iterator.value,
		opening: null,
		value:   null,
		closing: null,
		extra,
	}
	const element = withParent(new CSSDeclaration(items), parent)

	extra.betweenNameAndOpening = consumeListOfValuesWhile(iterator, element, isIteratingSkippableValues)

	// if the next value is anything other than a colon, return the incomplete element
	if (iterator.type !== COLA) return element

	// otherwise, consume the next input token
	items.opening = withParent(iterator.value, element)

	extra.betweenOpeningAndValue = consumeListOfValuesWhile(iterator, element, isIteratingSkippableValues)

	// if the next value is null, return the incomplete element
	if (iterator.type === null) return element

	iterator.redo()

	items.value = consumeListOfValuesWhile(iterator, element, isIterating)

	extra.betweenValueAndClosing = getSkippableSplicedValues(items.value, items.value.length - 1, -1)

	moveImportantValues()

	return element

	/**
	 * Move any "!important" tokens from the end of the value tokens to the declaration’s important token.
	 */
	function moveImportantValues() {
		const { value } = items
		let index = value.length - 1
		let node
		if (index > 0) {
			node = value[index]

			if (
				node.type === WORD_TYPE
				&& isImportantValue(node.value)
			) {
				const skippableIndex = index = getSkippableValuesIndex(value, index - 1, -1)

				if (index >= 0) {
					node = value[index - 1]

					if (node.type === BANG) {
						assignImportantNode(value, skippableIndex)

						extra.betweenValueAndImportant = value.splice(
							getSkippableValuesIndex(value, value.length - 1, -1)
						)
					}
				}
			}
		}
	}

	function assignImportantNode(values, skippableIndex) {
		const importantValue = values.pop()
		const importantExtra = { betweenSymbolAndValue: values.splice(skippableIndex) }
		const importantSymbol = values.pop()

		items.important = withParent(
			new CSSDeclarationImportant({
				symbol: importantSymbol,
				value:  importantValue,
				extra:  importantExtra,
			}),
			element
		)
	}
}

consumeDeclaration.prepare = true
