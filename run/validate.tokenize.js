import { readFileSync, writeFileSync } from 'fs'
import resolve from 'resolve'
import tokenizeOld from '../src/tokenize/tokenize.js'
import tokenizeNew from '../dist/tokenize.js'

// setup
const postcssDevTestName = `PostCSS Tokenizer (Development)`

const bootstrapCSSPath = resolve.sync(`bootstrap/dist/css/bootstrap.css`)
const bootstrapCSS = readFileSync(bootstrapCSSPath, `utf8`)

// introduction
console.log(`Validating ${postcssDevTestName} preserves CSS identically...\n`)

// ...
let tokens
let tokenizer

// process
tokens = []
tokenizer = tokenizeNew(bootstrapCSS)
while (tokenizer() === true) tokens.push(tokenizer.node)

writeFileSync(`result-new.json`, JSON.stringify(tokens.map(node => {
	const { constructor, ...object } = node
	const { name: type } = constructor
	return { type, ...object }
}), null, '  '))

// process
tokens = []
tokenizer = tokenizeOld(bootstrapCSS)
while (tokenizer() === true) tokens.push(tokenizer.value)

writeFileSync(`result-old.json`, JSON.stringify(tokens.map(node => {
	const { opening, value, closing, symbol, constructor, unit } = node
	const { name: type } = constructor
	return (
		type === 'CSSComment' || type === 'CSSString'
			? { type, prefix: opening, value, suffix: closing }
		: type === 'CSSAtWord' || type === 'CSSHash'
			? { type, prefix: symbol, value }
		: type === 'CSSNumber'
		? { type, value, unit }
	: { type, value }
	)
}), null, '  '))

const tokenizedCSS = tokens.map(node => node.toString()).join(``)

// validate
const isCssIdentical = bootstrapCSS === tokenizedCSS

if (isCssIdentical) {
	console.log('Success! The tokenizer preserves CSS identically.')
} else {
	console.warn(`Failure! The parser does not preserve CSS identically.`)

	const bootstrapSize = bootstrapCSS.length
	const tokenizedSize = tokenizedCSS.length

	if (bootstrapSize !== tokenizedSize) {
		console.warn(`Unaltered CSS is ${bootstrapSize} characters in length.`)
		console.warn(`Tokenized CSS is ${tokenizedSize} characters in length.`)
	}

	for (let i = 0, l = Math.max(bootstrapSize, tokenizedSize); i < l; ++i) {
		if (bootstrapCSS[i] !== tokenizedCSS[i]) {
			console.warn([
				bootstrapCSS.slice(i - 50, i + 50),
				tokenizedCSS.slice(i - 50, i + 50)
			])
			break
		}
	}
}
