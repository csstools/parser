import CSSNode from './CSSNode.js'

export default class CSSNumber extends CSSNode {}

CSSNumber.fromTokenizer = function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSNumber({
		value:  text.slice(open, shut - tail),
		unit:   text.slice(shut - tail, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}

const { prototype } = CSSNumber
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		value: String,
		unit:  String,
	},
	configurable: true,
	writable:     true,
})
