import tokenize from './tokenize.js'

import consumeCSSBlock from './types/CSSObject/CSSBlock.fromTokenizer.js'
import consumeCSSRoot from './types/CSSObject/fromTokenizer/CSSRoot.fromTokenizer.js'

export function parseFragment(input) {
	const tokenizer = tokenize(input)
	return consumeCSSBlock(tokenizer)
}

export function parseRoot(input) {
	const tokenizer = tokenize(input)
	return consumeCSSRoot(tokenizer)
}
