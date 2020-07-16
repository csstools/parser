import { COLA, BANG } from '../../../utils/code-points.js'

import CSSComment from '../CSSToken/CSSCommentToken.js'
import CSSSpace from '../CSSToken/CSSSpaceToken.js'
import CSSSymbol from '../CSSToken/CSSSymbolToken.js'

import CSSDeclaration from './CSSDeclaration.js'

import getTrailingSkippableIndex from '../../../utils/get-trailing-skippable-index.js'
import consumeLeadingWhitespace from '../../../utils/consume-leading-skippables.js'
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
	const block = new CSSDeclaration({
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

	let { token } = tokenizer
	token.parent = block

	// consume the declaration name, otherwise return the declaration
	block.nodes.name = token

	// consume any skippables following the declaration name
	consumeLeadingWhitespace(tokenizer, afterName, block)

	// consume the declaration opener or return the declaration
	if (tokenizer.type === COLA) {
		token = tokenizer.token
		token.parent = block
		block.nodes.opener = token
	} else return block

	// consume any skippables following the declaration opener
	consumeLeadingWhitespace(tokenizer, afterOpener, block)

	// consume the declaration value
	if (tokenizer.type >= 0) {
		do {
			value.push(token = consumeNodeFromTokenizer(tokenizer))
			token.parent = block
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

		/** Class of Node being inspected from the declaration value block. */
		let CSSClass

		// ignore skippables before the case-insensitive `important` word
		do {
			token = value[--indexOfImportant]
			CSSClass = token.constructor
		} while (
			CSSClass === CSSComment
			|| CSSClass === CSSSpace
		)

		/** Whether the value includes an important flag. */
		const doesHaveAnImportantFlag = (
			CSSClass === CSSSymbol
			&& token.type === BANG
		)

		if (doesHaveAnImportantFlag) {
			// redistribute the important flag and any surrounding skippables
			afterImportant.push(...value.splice(indexOfAfterValueOrImportant))
			important.push(...value.splice(indexOfImportant))
			afterValue.push(...value.splice(getTrailingSkippableIndex(value)))

			// return the declaration
			return block
		}
	}

	// redistribute any trailing skippables
	afterValue.push(...value.splice(indexOfAfterValueOrImportant))

	// return the declaration
	return block
}
