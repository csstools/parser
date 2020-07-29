import { CSSStyleSheet as parseCSSStyleSheet } from '../src/parse.js'
import { readFileSync } from 'fs'
import resolve from 'resolve'

const bootstrapCSSPath = resolve.sync(`bootstrap/dist/css/bootstrap.css`)
const bootstrapCSS = readFileSync(bootstrapCSSPath, `utf8`)

const sheet = parseCSSStyleSheet(bootstrapCSS)

const processedCSS = String(sheet)

// validate
const isCssIdentical = bootstrapCSS === processedCSS

if (isCssIdentical) {
	console.log(`Success! The parser preserves CSS identically.`)
} else {
	console.warn(`Failure! The parser does not preserve CSS identically.`)
	const bootstrapSize = bootstrapCSS.length
	const tokenizedSize = processedCSS.length

	if (bootstrapSize !== tokenizedSize) {
		console.warn(`Unaltered CSS is ${bootstrapSize} characters in length.`)
		console.warn(`Tokenized CSS is ${tokenizedSize} characters in length.`)
	}

	for (let i = 0, l = Math.max(bootstrapSize, tokenizedSize); i < l; ++i) {
		if (bootstrapCSS[i] !== processedCSS[i]) {
			console.warn(`Expected:`, [ bootstrapCSS.slice(i - 50, i), bootstrapCSS.slice(i, i + 50) ])
			console.warn(`Received:`, [ processedCSS.slice(i - 50, i), processedCSS.slice(i, i + 50) ])
			break
		}
	}
}
