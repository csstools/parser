import { parseFragment, parseRoot } from '../src/parse.js'

const cssText = `html {
	color: blue;

	@media (width >= 640px) {
		color: green;
	}
}

@media (width >= 640px) {
	html {
		color: red;
	}
}`

const input = {
	file: `-`,
	data: cssText,
}

const root = parseRoot(input)

console.log(root)
console.log([ String(root) ], String(root) === cssText)
