import { readFileSync } from 'fs'
import resolve from 'resolve'
import { parseCSSRoot } from '../src/parse.js'

// setup
const postcssDevTestName = `PostCSS Parser (Development)`

const bootstrapCSSPath = resolve.sync(`bootstrap/dist/css/bootstrap.css`)
const bootstrapCSS = readFileSync(bootstrapCSSPath, `utf8`)

const root = parseCSSRoot({ data: bootstrapCSS })

const tokenizedCSS = String(root)

// validate
const isCssIdentical = bootstrapCSS === tokenizedCSS

if (isCssIdentical) {
	console.log(`Success! The parser preserves CSS identically.`)
} else {
	console.warn(`Failure! The parser does not preserve CSS identically.`)
	const bootstrapSize = bootstrapCSS.length
	const tokenizedSize = tokenizedCSS.length

	if (bootstrapSize !== tokenizedSize) {
		console.warn(`Unaltered CSS is ${bootstrapSize} characters in length.`)
		console.warn(`Tokenized CSS is ${tokenizedSize} characters in length.`)

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
}
