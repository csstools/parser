// import { readFileSync } from 'fs'
// import resolve from 'resolve'
import parse from './parse.js'
import tokenize from './tokenize.js'
import consumeListOfRules from './consume.listOf.rules.js'

// const bootstrapCSSPath = resolve.sync(`bootstrap/dist/css/bootstrap.css`)
// const bootstrapCSS = readFileSync(bootstrapCSSPath, `utf8`)

// tokenize
const tokenizer = tokenize(`html {
	@media screen {
		color: blue !important;
	}
}`)

// parse
const parser = parse(tokenizer)
parser()
const [ rule ] = consumeListOfRules(parser)

console.log(rule.value)

// consume

// console.log(parser.root.toString() === bootstrapCSS)
// while (parser() === true) {
// 	if (parser.deep === 0 && parser.open === false) {
// 		console.log(parser.node)
// 	}
// }
