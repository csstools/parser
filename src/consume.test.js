import parse from './parse.js'
import tokenize from './tokenize.js'
import { consumeAsRuleList } from './consume.js'

const tokenizer = tokenize(`
html {
	hello: world;
	goodbye: moon;
}`)
const parser = parse(tokenizer)

while (parser() === true) continue

const { root } = parser

const list = consumeAsRuleList(root.value)

console.log(
	list.map((value) => value.toString())
)
