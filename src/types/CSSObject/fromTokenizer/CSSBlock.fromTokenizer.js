import { RofL } from '../../../utils/code-points.js'

import CSSBlock from '../CSSHost/CSSBlock.js'

import nodeFromTokenizer from './CSSNode.fromTokenizer.js'

/**
 * Consume a block
 * @see https://drafts.csswg.org/css-syntax/#consume-a-simple-block
 * @arg {Function} tokenizer
 * @arg {Function} [consumerOfBlockItems]
 */
export default function fromTokenizer(tokenizer, consumerOfBlockItems) {
	if (!tokenizer.item) tokenizer()
	if (!tokenizer.item) return null

	consumerOfBlockItems = consumerOfBlockItems || nodeFromTokenizer

	const element = new CSSBlock()
	const { nodes } = element
	const { opener, value, closer } = nodes

	opener.push(tokenizer.item)

	/** @type {number} Closing brace of the opening brace. */
	const CB = RofL[tokenizer.item.code]

	// create a simple block
	// with its associated token set to the current input token
	// and with a value with is initially an empty list.

	/** @type {CSSNode} Current Node */
	let item

	// Repeatedly consume the next input token and process it as follows:
	while (item = tokenizer().item) {
		switch (true) {
			// ending token
			case item.code === CB:
				// return the block
				closer.push(item)

				break

			// anything else
			default:
				// consume a component value and append it to the value of the block
				value.push(consumerOfBlockItems(tokenizer))

				continue
		}

		break
	}

	// return the style rule
	return element
}

/** @typedef {import('../CSSNode/CSSNode.js')} CSSNode */
