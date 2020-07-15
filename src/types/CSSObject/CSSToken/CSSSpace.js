import CSSToken from '../CSSToken.js'

export default class CSSSpace extends CSSToken {}

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
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `value` ],
		configurable: true,
		writable:     true,
	},
})
