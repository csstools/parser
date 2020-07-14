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
	if (!tokenizer.item) tokenizer()
	if (!tokenizer.item) return null

	// create an empty declaration
	const element = new CSSDeclaration()
	const { nodes } = element

	// consume the declaration name, otherwise return the declaration
	nodes.name.push(tokenizer.item)

	// consume any skippables following the declaration name
	consumeLeadingWhitespace(tokenizer, nodes.afterName)

	// consume the declaration opener or return the declaration
	if (tokenizer.item && tokenizer.item.code === COLA) nodes.opener.push(tokenizer.item)
	else return element

	// consume any skippables following the declaration opener
	consumeLeadingWhitespace(tokenizer, nodes.afterOpener)

	// consume the declaration value
	if (tokenizer.item) {
		do {
			nodes.value.push(
				valueFromTokenizer(tokenizer)
			)
		} while (tokenizer().item)
	}

	/** Index of the last skippable node. */
	const indexOfAfterValueOrImportant = getTrailingSkippableIndex(nodes.value)

	/** Whether the last non-skippable node is a case-insensitive `important` word. */
	const doesEndWithAnImportantWord = (
		indexOfAfterValueOrImportant > 1
		&& /^important$/i.test(nodes.value[indexOfAfterValueOrImportant - 1].value)
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
			node = nodes.value[--indexOfImportant]
			CSSClass = node.constructor
		} while (
			CSSClass === CSSComment
			|| CSSClass === CSSSpace
		)

		/** Whether the value includes an important flag. */
		const doesHaveAnImportantFlag = (
			CSSClass === CSSSymbol
			&& node.code === BANG
		)

		if (doesHaveAnImportantFlag) {
			// redistribute the important flag and any surrounding skippables
			nodes.afterImportant.push(...nodes.value.splice(indexOfAfterValueOrImportant))
			nodes.important.push(...nodes.value.splice(indexOfImportant))
			nodes.afterValue.push(...nodes.value.splice(getTrailingSkippableIndex(nodes.value)))

			// return the declaration
			return element
		}
	}

	// redistribute any trailing skippables
	nodes.afterValue.push(...nodes.value.splice(indexOfAfterValueOrImportant))

	// return the declaration
	return element
}
