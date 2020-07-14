import { readFileSync } from 'fs'
import BenchmarkJS from 'benchmark'
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

// setup tests
const postcssPrdTestName = `PostCSS Tokenizer (${version(`postcss/package.json`)})`
const postcssDevTestName = `PostCSS Tokenizer (Development)`

const { Suite: Benchmark } = BenchmarkJS

const tokensByTestIndex = []

Object.entries({
	// postcss production test
	[postcssPrdTestName]: () => {
		const read = tokenizePrd({ css: bootstrapCSS })
		const tokens = []
		while (!read.endOfFile()) tokens.push(read.nextToken())
		tokensByTestIndex[0] = tokens
	},
	// postcss development test
	[postcssDevTestName]: () => {
		const read = tokenizeDev({ data: bootstrapCSS })
		const tokens = []
		while (read().item) tokens.push(read.item)
		tokensByTestIndex[1] = tokens
	},
}).reduce(
	(suite, [name, func]) => suite.add(name, func),
	new Benchmark()
).on(`complete`, (event) => {
	// assign `tokens` to each test result
	const results = Array.from(
		event.currentTarget,
		(result, i) => Object.defineProperty(result, `tokens`, { value: tokensByTestIndex[i] })
	)

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
	const longestTokens = String(results.slice().sort(
		(a, b) => b.tokens.length - a.tokens.length
	).shift().tokens.length)

	// use the slowest test result as a basis of comparison
	const slowestHz = results.slice().pop().hz

	// write the results of the tests
	write(`\n`)

	results.forEach(({ hz, name, tokens }) => {
		write(
			`${name}: ${indent(longestName, name)}${indent(
				longestTokens,
				String(tokens.length)
			)}${tokens.length} tokens in ${indent(
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
