import CSSNode from './CSSNode.js'

export default class CSSSpace extends CSSNode {}

CSSSpace.fromTokenizer = function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSSpace({
		value:  text.slice(open, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}

const { prototype } = CSSSpace
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		value: String,
	},
	configurable: true,
	writable:     true,
})
