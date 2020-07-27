import {
	consumeBlock,
	consumeDeclaration,
	consumeFunction,
	consumeListOfDeclarations,
	consumeListOfValues,
	consumeStyleAtRule,
	consumeStyleRule,
	consumeStyleSheet,
	consumeValue,
} from '../src/consume.styles.js'
import tokenize from '../src/tokenize.js'

const { isArray } = Array

function test(name, cssValue, consumer, doIteration) {
	console.log('Test:', name)

	const iterator = tokenize(cssValue, doIteration)
	const consumed = consumer(iterator)
	const outValue = isArray(consumed) ? consumed.join(``) : consumed.toString()
	const doesPass = outValue === cssValue

	if (doesPass) {
		console.log('Success!')
	} else {
		console.log('Failure...')
		console.log({
			cssValue,
			outValue,
		})
	}
	console.log(``)
}

console.log(``)
test(
	`Block`,
	`{ word @atword #hash }`,
	consumeBlock,
	true
)
test(
	`Declaration`,
	`hello\t: world\t! important\t`,
	consumeDeclaration,
	true
)
test(
	`List of Declarations`,
	`hello\t: world\t! important\t; hello\t: world\t! important\t`,
	consumeListOfDeclarations,
	false
)
test(
	`Function`,
	`var(--brand, blue)`,
	consumeFunction,
	true
)
test(
	`Style At Rule`,
	`@media screen {\n\thtml { color: blue; }\n}`,
	consumeStyleAtRule,
	true
)
test(
	`Style Rule`,
	`html { color: blue; }`,
	consumeStyleRule,
	true
)
test(
	`Style Sheet`,
	`html { color: blue; }`,
	consumeStyleSheet,
	false
)
test(
	`Value`,
	`{\tword [\t@atword ]\t( #hash\t) }`,
	consumeValue,
	true
)
test(
	`List of Values`,
	`{\tword [\t@atword ]\t( #hash\t) }\t{ word\t[ @atword\t] (\t#hash )\t}`,
	consumeListOfValues,
	false
)

