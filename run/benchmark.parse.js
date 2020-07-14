import { readFileSync } from 'fs'
import BenchmarkJS from 'benchmark'
import resolve from 'resolve'
import ParserPrd from 'postcss/lib/parser.js'
import { parseRoot as parseDev } from '../src/parse.js'

import postcssValuesParserPackage from 'postcss-values-parser'
import PostcssSelectorParser from 'postcss-selector-parser'

const { parse: postcssValuesParser } = postcssValuesParserPackage
const postcssSelectorParser = PostcssSelectorParser()

// setup test utilities
const write = process.stdout.write.bind(process.stdout)
const indent = (a, b) => ` `.repeat(Math.abs(a.length - b.length))
const mstime = (hz) => `${Math.round((1 / hz) * 1000).toString()} ms`
const version = (id) => JSON.parse(readFileSync(resolve.sync(id))).version

// setup bootstrap css variables
const bootstrapCSSPath = resolve.sync(`bootstrap/dist/css/bootstrap.css`)
const bootstrapCSS = readFileSync(bootstrapCSSPath, `utf8`)

write(`\nCollecting PostCSS Parser Benchmarks...\n`)

// setup tests
const postcssPrdTestName = `PostCSS Parser (${version(`postcss/package.json`)})`
const postcssAllTestName = `PostCSS/Selector/Value Parsers`
const postcssDevTestName = `PostCSS Parser (Development)`

const { Suite: Benchmark } = BenchmarkJS

const tokensByTestIndex = [ [], [], [] ]

Object.entries({
	// postcss production test
	[postcssPrdTestName]: () => {
		let parsed = new ParserPrd({ css: bootstrapCSS }, { from: bootstrapCSSPath })
		parsed.parse()

		// hard-code the number of nodes parsed
		// so as not to negatively skew the results of the combined parsers
		tokensByTestIndex[0] = { length: 6240 }
	},
	[postcssAllTestName]: () => {
		let parsed = new ParserPrd({ css: bootstrapCSS }, { from: bootstrapCSSPath })
		parsed.parse()
		parsed.root.walk(node => {
			switch (node.type) {
				case 'decl':
					postcssValuesParser(node.value)
					break
				case 'rule':
					postcssSelectorParser.processSync(node.selector)
					break
			}
		})

		// hard-code the number of nodes parsed
		// so as not to negatively skew the results of the combined parsers
		tokensByTestIndex[1] = { length: 28491 }
	},
	// postcss development test
	[postcssDevTestName]: () => {
		parseDev({ data: bootstrapCSS })

		// hard-code the number of nodes parsed
		// so as not to negatively skew the results of the combined parsers
		tokensByTestIndex[2] = { length: 67811 }
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
