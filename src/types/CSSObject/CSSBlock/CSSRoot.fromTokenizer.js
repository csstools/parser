import CSSRoot from './CSSRoot.js'

import consumeCSSRootValue from './CSSRoot.valueFromTokenizer.js'

/**
 * Consume a CSSRoot.
 * @see https://drafts.csswg.org/css-syntax/#consume-declaration
 */
export default function fromTokenizer(tokenizer) {
	const value = []
	const block = new CSSRoot({ value })

	let token

	if (
		tokenizer.type >= 0
		|| tokenizer()
	) {
		do {
			value.push(token = consumeCSSRootValue(tokenizer))
			token.parent = block
		} while (tokenizer())
	}

	return block
}
