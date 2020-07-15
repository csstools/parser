import { COLA, BANG } from '../../../utils/code-points.js'

import CSSComment from '../CSSNode/CSSComment.js'
import CSSSpace from '../CSSNode/CSSSpace.js'
import CSSSymbol from '../CSSNode/CSSSymbol.js'

import CSSDeclaration from '../CSSHost/CSSDeclaration.js'

import getTrailingSkippableIndex from '../../../utils/getTrailingSkippableIndex.js'
import consumeLeadingWhitespace from '../../../utils/consumeLeadingWhitespace.js'
import valueFromTokenizer from './CSSNode.fromTokenizer.js'

/**
 * Consume a Declaration
 * @see https://drafts.csswg.org/css-syntax/#consume-declaration
 */
export default function fromTokenizer(tokenizer) {
	// create an empty declaration
	const element = new CSSDeclaration()
	const { name, afterName, opener, afterOpener, value, afterValue, important, afterImportant } = element.nodes

	// consume the declaration name, otherwise return the declaration
	name.push(tokenizer.node)

	// consume any skippables following the declaration name
	consumeLeadingWhitespace(tokenizer, afterName)

	// consume the declaration opener or return the declaration
	if (tokenizer.type === COLA) opener.push(tokenizer.node)
	else return element

	// consume any skippables following the declaration opener
	consumeLeadingWhitespace(tokenizer, afterOpener)

	// consume the declaration value
	if (tokenizer.type >= 0) {
		do {
			value.push(
				valueFromTokenizer(tokenizer)
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
