import CSSToken from './CSSToken.js'

export default class CSSWord extends CSSToken {}

CSSWord.fromTokenizer = function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSWord({
		value:  text.slice(open, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}

const { defineProperties } = Object

defineProperties(CSSWord.prototype, {
	props: {
		value:        [ `value` ],
		configurable: true,
		writable:     true,
	},
})
