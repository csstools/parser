import { R_RB } from '../../../utils/code-points.js'

import CSSFunction from '../CSSHost/CSSFunction.js'

import nodeFromTokenizer from './CSSNode.fromTokenizer.js'

/**
 * Consume a function
 * @see https://drafts.csswg.org/css-syntax/#consume-a-function
 */
export default function fromTokenizer(tokenizer) {
	if (!tokenizer.item) tokenizer()
	if (!tokenizer.item) return null

	const element = new CSSFunction()
	const { nodes } = element
	const { opener, value, closer } = nodes

	opener.push(tokenizer.item)

	/** @type {CSSNode} Current Node */
	let item

	// Repeatedly consume the next input token and process it as follows:
	while (item = tokenizer().item) {
		switch (true) {
			// <)-token>
			case item.code === R_RB:
				// return the block
				closer.push(item)

				break

			// anything else
			default:
				// consume a component value and append the returned value to the function block.
				value.push(nodeFromTokenizer(tokenizer))

				continue
		}

		break
	}

	// return the function
	return element
}

/** @typedef {import('../CSSNode/CSSNode.js')} CSSNode */
