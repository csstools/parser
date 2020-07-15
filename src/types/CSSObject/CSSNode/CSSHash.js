import CSSNode from './CSSNode.js'

export default class CSSHash extends CSSNode {}

CSSHash.fromTokenizer = function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSHash({
		symbol: `#`,
		value:  text.slice(open + lead, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}

const { prototype } = CSSHash
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		symbol: String,
		value:  String,
	},
	configurable: true,
	writable:     true,
})
