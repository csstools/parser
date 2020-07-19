import { readFileSync } from 'fs'
import resolve from 'resolve'
import parse from './parse.js'

const bootstrapCSSPath = resolve.sync(`bootstrap/dist/css/bootstrap.css`)
const bootstrapCSS = readFileSync(bootstrapCSSPath, `utf8`)

// process
const parser = parse(bootstrapCSS)
while (parser() === true) continue

// console.log(parser.root.toString() === bootstrapCSS)
// while (parser() === true) {
// 	if (parser.deep === 0 && parser.open === false) {
// 		console.log(parser.node)
// 	}
// }
