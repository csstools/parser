import CSSNode from './CSSNode.js'

export default class CSSSymbol extends CSSNode {}

CSSSymbol.fromTokenizer = function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSSymbol({
		value:  text.slice(open, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}

const { prototype } = CSSSymbol
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		value: String,
	},
	configurable: true,
	writable:     true,
})
