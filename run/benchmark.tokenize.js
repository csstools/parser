import { readFileSync } from 'fs'
import Benchmark from 'benchmark'
import resolve from 'resolve'
import tokenizePrd from 'postcss/lib/tokenize.js'
import tokenizeDev from '../src/tokenize/tokenize.js'

// setup test utilities
const write = process.stdout.write.bind(process.stdout)
const indent = (a, b) => ` `.repeat(Math.abs(a.length - b.length))
const mstime = (hz) => `${Math.round((1 / hz) * 1000).toString()} ms`
const version = (id) => JSON.parse(readFileSync(resolve.sync(id))).version

// setup bootstrap css variables
const bootstrapCSSPath = resolve.sync(`bootstrap/dist/css/bootstrap.css`)
const bootstrapCSS = readFileSync(bootstrapCSSPath, `utf8`)

write(`\nCollecting PostCSS Tokenizer Benchmarks...\n`)

const suite = new Benchmark.Suite

let returnValue
const addTest = (name, fn) => suite.add({
	name,
	fn,
	onCycle(event) {
		event.currentTarget.returnValue = returnValue
	}
})

addTest(`PostCSS Tokenizer (${version(`postcss/package.json`)})`, () => {
	returnValue = []
	const tokenizer = tokenizePrd({ css: bootstrapCSS })
	while (!tokenizer.endOfFile()) returnValue.push(tokenizer.nextToken())
})

addTest(`PostCSS Tokenizer (Development)`, () => {
	returnValue = []
	const tokenizer = tokenizeDev(bootstrapCSS)
	while (tokenizer() === true) returnValue.push(tokenizer.type)
})

suite.on(`complete`, (event) => {
	// assign `tokens` to each test result
	const results = Array.from(event.currentTarget)

	// setup production test results as the basis of comparison
	const prdResults = results[0]
	const { hz: prdHz, name: prdName } = prdResults

	// sort test results by fastest to slowest
	results.sort(
		(a, b) => b.hz - a.hz
	)

	// calculate the longest test name for visual alignemnt in CLI output
	const longestName = results.slice().sort((a, b) => b.name.length - a.name.length).shift().name

	// calculate the longest token number for visual alignemnt in CLI output
	const longestReturnValue = String(results.slice().sort(
		(a, b) => b.returnValue.length - a.returnValue.length
	).shift().returnValue.length)

	// use the slowest test result as a basis of comparison
	const slowestHz = results.slice().pop().hz

	// write the results of the tests
	write(`\n`)

	results.forEach(({ hz, name, returnValue }) => {
		write(
			`${name}: ${indent(longestName, name)}${indent(
				longestReturnValue,
				String(returnValue.length)
			)}${returnValue.length} tokens in ${indent(
				mstime(slowestHz),
				mstime(hz)
			)}${mstime(hz)}`
		)

		if (name !== prdName) {
			if (hz > prdHz) write(` (${(hz / prdHz).toFixed(1)} times faster)`)
			else write(` (${(prdHz / hz).toFixed(1)} times slower)`)
		}

		write(`\n`)
	})

	write(`\n`)
}).run()
