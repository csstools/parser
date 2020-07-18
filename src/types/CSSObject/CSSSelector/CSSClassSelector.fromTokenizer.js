import CSSClassSelector from './CSSClassSelector.js'

/**
 * Consume a CSSRoot.
 * @see https://drafts.csswg.org/css-syntax/#consume-declaration
 */
export default function fromTokenizer(tokenizer) {
	const selector = new CSSClassSelector({ symbol: null, value: null })

	let token

	if (
		tokenizer.type >= 0
		|| tokenizer()
	) {
		// ...
	}

	return selector
}
