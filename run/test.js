import { inspect } from 'util'
import * as consumers from '../src/consumers/index.js'
import tokenize from '../src/tokenize/tokenize.js'

const cols = process.stdout.columns || 120

inspect.defaultOptions.breakLength = cols
inspect.defaultOptions.colors = true
inspect.defaultOptions.depth = Infinity
inspect.defaultOptions.maxArrayLength = cols
inspect.defaultOptions.maxStringLength = cols

const cssValue = `\nhtml, body\t,\n*.foo:nth-child(5) {
	color: blue;

	@media screen {
		color: red;
	}

	& h1,
	& h2 {
		font-weight: bold;
	}
}`

const iterator = tokenize(cssValue)

console.log(
	consumers.CSSStyleSheet(iterator)
)
