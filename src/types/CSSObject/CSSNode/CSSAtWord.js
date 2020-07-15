import CSSNode from './CSSNode.js'

export default class CSSAtWord extends CSSNode {}

CSSAtWord.fromTokenizer = function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSAtWord({
		symbol: `@`,
		value:  text.slice(open + lead, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}

const { prototype } = CSSAtWord
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		symbol: String,
		value:  String,
	},
	configurable: true,
	writable:     true,
})
