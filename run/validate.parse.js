import { readFileSync } from 'fs'
import resolve from 'resolve'
import { parseRoot } from '../src/parse.js'

// setup
const postcssDevTestName = `PostCSS Parser (Development)`

const bootstrapCSSPath = resolve.sync(`bootstrap/dist/css/bootstrap.css`)
const bootstrapCSS = readFileSync(bootstrapCSSPath, `utf8`)

// introduction
console.log(`Validating whether ${postcssDevTestName} preserves CSS identically...\n`)

// process
const root = parseRoot({ data: bootstrapCSS })

const tokenizedCSS = String(root)

// validate
const isCssIdentical = bootstrapCSS === tokenizedCSS

if (isCssIdentical) {
	console.log(`Success! The tokenizer preserves CSS identically.`)
} else {
	console.warn(`Failure! The tokenizer does not preserve CSS identically.`)
	const bootstrapSize = bootstrapCSS.length
	const tokenizedSize = tokenizedCSS.length

	if (bootstrapSize !== tokenizedSize) {
		console.warn(`Unaltered CSS is ${bootstrapSize} characters in length.`)
		console.warn(`Tokenized CSS is ${tokenizedSize} characters in length.`)
	}
}
