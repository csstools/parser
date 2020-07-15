import CSSToken from '../CSSToken.js'

export default class CSSNumber extends CSSToken {}

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

const { defineProperties } = Object

defineProperties(CSSNumber.prototype, {
	props: {
		value:        [ `value`, `unit` ],
		configurable: true,
		writable:     true,
	},
})
