import { R_RB } from '../../../utils/code-points.js'

import CSSFunction from '../CSSBlock/CSSFunction.js'

import nodeFromTokenizer from './CSSBlock.valueFromTokenizer.js'

/**
 * Consume a function
 * @see https://drafts.csswg.org/css-syntax/#consume-a-function
 */
export default function fromTokenizer(tokenizer) {
	const value = []
	const element = new CSSFunction({ opener: null, value, closer: null })

	element.nodes.opener = tokenizer.node

	// Repeatedly consume the next input token and process it as follows:
	while (tokenizer()) {
		if (tokenizer.type === R_RB) {
			closer.push(nodeFromTokenizer(tokenizer))

			break
		}

		value.push(nodeFromTokenizer(tokenizer))

		continue
	}

	// return the function
	return element
}
