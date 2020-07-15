import CSSRoot from '../CSSBlock/CSSRoot.js'

import consumeCSSRootValue from './CSSRoot.valueFromTokenizer.js'

/**
 * Consume a CSSRoot.
 * @see https://drafts.csswg.org/css-syntax/#consume-declaration
 */
export default function fromTokenizer(tokenizer) {
	const value = []
	const block = new CSSRoot({ value })

	if (
		tokenizer.type >= 0
		|| tokenizer()
	) {
		do {
			value.push(
				consumeCSSRootValue(tokenizer)
			)
		} while (
			tokenizer()
		)
	}

	return block
}
