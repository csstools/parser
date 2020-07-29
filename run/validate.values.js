import { inspect } from 'util'
import * as parse from '../src/parse.js'
import { CSSGroup } from '../src/values/index.js'

const cols = process.stdout.columns || 120
inspect.defaultOptions.breakLength = cols
inspect.defaultOptions.colors = true
inspect.defaultOptions.depth = Infinity
inspect.defaultOptions.maxArrayLength = cols
inspect.defaultOptions.maxStringLength = cols

const allTestPassed = [
	test(`CSSDeclaration`, parse.CSSDeclaration, `declaration-name : word @atword #hash ! important`),
	test(`CSSStyleRule`, parse.CSSStyleRule, `html, body:last-child {\n  color: blue;\n}`),
	test(`CSSStyleSheet`, parse.CSSStyleSheet, `:root {\n  --custom-property: value;\n}\n\nhtml, body:last-child {\n  color: blue;\n  @media (width >= 960px) {\n    color: red;\n  }\n}`),
	test(`listOfCSSSeparations`, parse.listOfCSSSeparations, `html, { color: blue }`),
	test(`CSSStyleRule`, parse.CSSStyleRule, `html, { color: blue }`),
].every(Boolean)

if (allTestPassed) process.exit(0)
else process.exit(1)

function test(name, fn, sourceCSS) {
	const resultAST = fn(sourceCSS)
	const resultASV = Array.isArray(resultAST) ? resultAST : resultAST.toValues()
	const resultCSS = resultASV.map(String).join(``)
	if (resultCSS === sourceCSS) {
		console.log(name, `passed.`)

		return true
	}

	console.warn(name, `failed!`)

	const sourceSize = sourceCSS.length
	const resultSize = resultCSS.length

	if (sourceSize !== resultSize) {
		console.warn(`Source CSS is ${sourceSize} characters in length.`)
		console.warn(`Result CSS is ${resultSize} characters in length.`)
	}

	for (let i = 0, l = Math.max(sourceSize, resultSize); i < l; ++i) {
		if (sourceCSS[i] !== resultCSS[i]) {
			console.warn(`Expected:`, [ sourceCSS.slice(i - 50, i), sourceCSS.slice(i, i + 50) ])
			console.warn(`Received:`, [ resultCSS.slice(i - 50, i), resultCSS.slice(i, i + 50) ])
			break
		}
	}

	return false
}
