import CSSBlock from '../CSSBlock/CSSBlock.js'

import consumeCSSBlockValue from './CSSBlock.valueFromTokenizer.js'

/**
 * Consume a CSSBlock.
 * @see https://drafts.csswg.org/css-syntax/#consume-declaration
 */
export default function fromTokenizer(tokenizer) {
	const value = []
	const block = new CSSBlock({ value })

	if (
		tokenizer.type >= 0
		|| tokenizer()
	) {
		do {
			value.push(
				consumeCSSBlockValue(tokenizer)
			)
		} while (
			tokenizer()
		)
	}

	return block
}
