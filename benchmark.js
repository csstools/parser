import Benchmark from 'benchmark'

// setup test utilities
const write = process.stdout.write.bind(process.stdout)
const indent = (a, b) => ` `.repeat(Math.abs(a.length - b.length))
const mstime = (hz) => `${Math.round((1 / hz) * 1000).toString()} ms`

const LATIN_CAPITAL_LETTER_A_CHAR = `A`
const LATIN_CAPITAL_LETTER_Z_CHAR = `Z`
const LATIN_SMALL_LETTER_A_CHAR   = `a`
const LATIN_SMALL_LETTER_Z_CHAR   = `z`
const LATIN_CAPITAL_LETTER_A_CODE = 0x0041
const LATIN_CAPITAL_LETTER_Z_CODE = 0x005A
const LATIN_SMALL_LETTER_A_CODE   = 0x0061
const LATIN_SMALL_LETTER_Z_CODE   = 0x007A

const charArray = []
const codeArray = []

for (let i = 65, l = 122; i <= l; ++i) {
	charArray.push(String.fromCharCode(i))
	codeArray.push(i)
}

function isUppercaseLetterChar(char) {
	return (
		char >= LATIN_CAPITAL_LETTER_A_CHAR
		&& char <= LATIN_CAPITAL_LETTER_Z_CHAR
	)
}

function isLowercaseLetterChar(char) {
	return (
		char >= LATIN_SMALL_LETTER_A_CHAR
		&& char <= LATIN_SMALL_LETTER_Z_CHAR
	)
}

function isLetterChar(char) {
	return (
		isUppercaseLetterChar(char)
		&& isLowercaseLetterChar(char)
	)
}

function isUppercaseLetterCode(code) {
	return (
		code >= LATIN_CAPITAL_LETTER_A_CODE
		&& code <= LATIN_CAPITAL_LETTER_Z_CODE
	)
}

function isLowercaseLetterCode(code) {
	return (
		code >= LATIN_SMALL_LETTER_A_CODE
		&& code <= LATIN_SMALL_LETTER_Z_CODE
	)
}

function isLetterCode(code) {
	return (
		isUppercaseLetterCode(code)
		&& isLowercaseLetterCode(code)
	)
}

/* === */

const suite = new Benchmark.Suite()

let returnValue
const addTest = (name, fn) => suite.add({
	name,
	fn,
	onCycle(event) {
		event.currentTarget.returnValue = returnValue
	},
})

addTest(`Using Chars`, () => {
	returnValue = []
	for (const char of charArray) returnValue.push(isUppercaseLetterChar(char))
	for (const char of charArray) returnValue.push(isLowercaseLetterChar(char))
	for (const char of charArray) returnValue.push(isLetterChar(char))
})

addTest(`Using Codes`, () => {
	returnValue = []
	for (const code of codeArray) returnValue.push(isUppercaseLetterCode(code))
	for (const code of codeArray) returnValue.push(isLowercaseLetterCode(code))
	for (const code of codeArray) returnValue.push(isLetterCode(code))
})

suite.on(`complete`, (event) => {
	const results = Array.from(event.currentTarget)

	console.log(results[0].returnValue.join() === results[1].returnValue.join())

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
			)}${returnValue.length} values in ${indent(
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
