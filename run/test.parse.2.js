import { inspect } from 'util'
import * as parse from '../src/parse.js'

const cols = process.stdout.columns || 120

inspect.defaultOptions.breakLength = cols
inspect.defaultOptions.colors = true
inspect.defaultOptions.depth = Infinity
inspect.defaultOptions.maxArrayLength = cols
inspect.defaultOptions.maxStringLength = cols

const cssValue = `html, body, *.foo:nth-child(5) {}`

console.log(
	parse.CSSStyleSheet(cssValue).toString() === cssValue
)
