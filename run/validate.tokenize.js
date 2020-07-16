import { readFileSync } from 'fs'
import resolve from 'resolve'
import tokenize from '../src/tokenize.js'

// setup
const postcssDevTestName = `PostCSS Tokenizer (Development)`

const bootstrapCSSPath = resolve.sync(`bootstrap/dist/css/bootstrap.css`)
const bootstrapCSS = readFileSync(bootstrapCSSPath, `utf8`)

// introduction
console.log(`Validating ${postcssDevTestName} preserves CSS identically...\n`)

// process
const tokenizer = tokenize({ data: bootstrapCSS })
const buffer = []
while (tokenizer()) buffer.push(tokenizer.token)

const tokenizedCSS = buffer.join(``)

// validate
const isCssIdentical = bootstrapCSS === tokenizedCSS

if (isCssIdentical) {
	console.log('Success! The tokenizer preserves CSS identically.')
} else {
	console.warn('Failure! The tokenizer does not preserve CSS identically.')
}
