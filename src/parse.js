import tokenize from './tokenize.js'
import { consumeCSSBlock, consumeCSSRoot } from './consume.js'

export function parseCSSBlock(input) {
	return consumeCSSBlock(tokenize(input)())
}

export function parseCSSRoot(input) {
	return consumeCSSRoot(tokenize(input)())
}
