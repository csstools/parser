import { R_RB } from '../../../utils/code-points.js'

import CSSFunction from '../CSSHost/CSSFunction.js'

import nodeFromTokenizer from './CSSNode.fromTokenizer.js'

/**
 * Consume a function
 * @see https://drafts.csswg.org/css-syntax/#consume-a-function
 */
export default function fromTokenizer(tokenizer) {
	const element = new CSSFunction()
	const { opener, value, closer } = element.nodes

	opener.push(tokenizer.node)

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
