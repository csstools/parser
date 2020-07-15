import CSSNode from './CSSNode.js'

export default class CSSWord extends CSSNode {}

CSSWord.fromTokenizer = function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSWord({
		value:  text.slice(open, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}

const { prototype } = CSSWord
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		value: String,
	},
	configurable: true,
	writable:     true,
})
