import { readFileSync } from 'fs'
import resolve from 'resolve'
import tokenize from './tokenize.js'
import consumeNode from './types/CSSObject/fromTokenizer/CSSNode.fromTokenizer.js'
import consumeDeclaration from './types/CSSObject/fromTokenizer/CSSDeclaration.fromTokenizer.js'

// const bootstrapCSSPath = resolve.sync(`bootstrap/dist/css/bootstrap.css`)
// const bootstrapCSS = readFileSync(bootstrapCSSPath, `utf8`)

// const bootstrapCSS = `html body {
// 	color: blue;
// }`

const bootstrapCSS = `color: blue`

const input = { file: `-`, data: bootstrapCSS }
const tokenizer = tokenize(input)
const tokens = []
while (tokenizer()) {
	tokens.push(
		consumeDeclaration(tokenizer)
	)
}

console.log(tokens[0])
console.log(tokens[0].nodes.name[0])
