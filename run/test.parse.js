import { readFileSync } from 'fs'
import resolve from 'resolve'
import { parseCSSRoot } from '../src/parse.js'

// setup
const postcssDevTestName = `PostCSS Parser (Development)`

const bootstrapCSSPath = resolve.sync(`bootstrap/dist/css/bootstrap.css`)
const bootstrapCSS = readFileSync(bootstrapCSSPath, `utf8`)

const root = parseCSSRoot(bootstrapCSS)

root.walk(node => {
	if (node.isNode) {
		if (node.parent) {
			console.log([ node.parent.toString() ])
		} else {
			// console.log( node )
		}
	}
})
