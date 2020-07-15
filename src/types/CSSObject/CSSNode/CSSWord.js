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
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `value` ],
		configurable: true,
		writable:     true,
	},
})
