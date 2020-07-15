import { COLA, BANG } from '../../../utils/code-points.js'

import CSSComment from '../CSSToken/CSSComment.js'
import CSSSpace from '../CSSToken/CSSSpace.js'
import CSSSymbol from '../CSSToken/CSSSymbol.js'

import CSSDeclaration from '../CSSBlock/CSSDeclaration.js'

import getTrailingSkippableIndex from '../../../utils/getTrailingSkippableIndex.js'
import consumeLeadingWhitespace from '../../../utils/consumeLeadingWhitespace.js'
import consumeNodeFromTokenizer from '../CSSBlock.valueFromTokenizer.js'

/**
 * Consume a Declaration
 * @see https://drafts.csswg.org/css-syntax/#consume-declaration
 */
export default function fromTokenizer(tokenizer) {
	// create an empty declaration
	const afterName = []
	const afterOpener = []
	const value = []
	const afterValue = []
	const important = []
	const afterImportant = []
	const element = new CSSDeclaration({
		name:   null,
		afterName,
		opener: null,
		afterOpener,
		value,
		afterValue,
		important,
		afterImportant,
		closer: null,
	})

	// consume the declaration name, otherwise return the declaration
	element.nodes.name = tokenizer.node

	// consume any skippables following the declaration name
	consumeLeadingWhitespace(tokenizer, afterName)

	// consume the declaration opener or return the declaration
	if (tokenizer.type === COLA) element.nodes.opener = tokenizer.node
	else return element

	// consume any skippables following the declaration opener
	consumeLeadingWhitespace(tokenizer, afterOpener)

	// consume the declaration value
	if (tokenizer.type >= 0) {
		do {
			value.push(
				consumeNodeFromTokenizer(tokenizer)
			)
		} while (tokenizer())
	}

	/** Index of the last skippable node. */
	const indexOfAfterValueOrImportant = getTrailingSkippableIndex(value)

	/** Whether the last non-skippable node is a case-insensitive `important` word. */
	const doesEndWithAnImportantWord = (
		indexOfAfterValueOrImportant > 1
		&& /^important$/i.test(value[indexOfAfterValueOrImportant - 1].value)
	)

	if (doesEndWithAnImportantWord) {
		/** Index of the beginning of an important flag. */
		let indexOfImportant = indexOfAfterValueOrImportant - 1

		/** Node being inspected from the declaration value block. */
		let node

		/** Class of Node being inspected from the declaration value block. */
		let CSSClass

		// ignore skippables before the case-insensitive `important` word
		do {
			node = value[--indexOfImportant]
			CSSClass = node.constructor
		} while (
			CSSClass === CSSComment
			|| CSSClass === CSSSpace
		)

		/** Whether the value includes an important flag. */
		const doesHaveAnImportantFlag = (
			CSSClass === CSSSymbol
			&& node.type === BANG
		)

		if (doesHaveAnImportantFlag) {
			// redistribute the important flag and any surrounding skippables
			afterImportant.push(...value.splice(indexOfAfterValueOrImportant))
			important.push(...value.splice(indexOfImportant))
			afterValue.push(...value.splice(getTrailingSkippableIndex(value)))

			// return the declaration
			return element
		}
	}

	// redistribute any trailing skippables
	afterValue.push(...value.splice(indexOfAfterValueOrImportant))

	// return the declaration
	return element
}
