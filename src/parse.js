import tokenize from './tokenize.js'
import { consumeCSSBlock, consumeCSSRoot } from './consume.js'

/**
 * Parses CSS and returns an object representation of the CSS.
 * @arg {string | import('./types/CSSObject/CSSInput.js')} input - CSS Input being parsed.
 */
export function parseCSSBlock(input) {
	return consumeCSSBlock(
		tokenize(input)()
	)
}

export function parseCSSRoot(input) {
	return consumeCSSRoot(
		tokenize(input)()
	)
}
