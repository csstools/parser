import CSSNode from './CSSNode.js'

export default class CSSFunctionWord extends CSSNode {}

CSSFunctionWord.fromTokenizer = function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSFunctionWord({
		value:  text.slice(open, shut - tail),
		symbol: `(`,
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}

const { prototype } = CSSFunctionWord
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		value:  String,
		symbol: String,
	},
	configurable: true,
	writable:     true,
})
