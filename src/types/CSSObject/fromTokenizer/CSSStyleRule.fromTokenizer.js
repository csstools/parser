import { L_CB, SEMI, R_CB } from '../../../utils/code-points.js'

import CSSAtWord from '../CSSNode/CSSAtWord.js'
import CSSStyleRule from '../CSSHost/CSSStyleRule.js'
import CSSWord from '../CSSNode/CSSWord.js'

import consumeAtStyleRuleFromTokenizer from './CSSAtRule.fromTokenizer.js'
import blockFromTokenizer from './CSSBlock.fromTokenizer.js'
import declarationFromTokenizer from './CSSDeclaration.fromTokenizer.js'
import nodeFromTokenizer from './CSSNode.fromTokenizer.js'
import { createArrayIterator } from '../../../utils/createNext.js'

/**
 * Consume a style rule
 * @see https://drafts.csswg.org/css-syntax/#consume-a-qualified-rule
 */
export default function fromTokenizer(tokenizer) {
	if (!tokenizer.item) tokenizer()
	if (!tokenizer.item) return null

	// create an empty declaration
	const element = new CSSStyleRule()
	const { nodes } = element
	const { prelude, value } = nodes

	do {
		const { item } = tokenizer

		switch (true) {
			// <{-token>
			case item.code === L_CB:
				// consume a simple block and assign it to the style rule’s block
				value.push(
					blockFromTokenizer(tokenizer, declarationsFromTokenizer)
				)

				break

			// anything else
			default:
				// consume a component value
				// append the returned value to the style rule’s prelude.
				prelude.push(
					nodeFromTokenizer(tokenizer)
				)

				continue
		}

		break
	} while (tokenizer().item)

	// return the style rule
	return element
}

function declarationsFromTokenizer(tokenizer) {
	let { item } = tokenizer
	let declarationTokenizer
	let element

	switch (true) {
		// ...
		case item.constructor === CSSAtWord:
			return consumeAtStyleRuleFromTokenizer(tokenizer, declarationsFromTokenizer)

		// ...
		case item.constructor === CSSWord:
			declarationTokenizer = createArrayIterator()

			// ...
			do {
				// ...
				if (
					item.code === SEMI
					|| item.code === R_CB
				) break

				// ...
				declarationTokenizer.push(item)
			} while (item = tokenizer().item)

			element = declarationFromTokenizer(declarationTokenizer)

			if (item.code === SEMI) element.nodes.closer.push(item)
			else ++tokenizer.hold

			return element

		// ...
		default:
			return nodeFromTokenizer(tokenizer)
	}
}
