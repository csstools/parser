import CSSToken from '../CSSToken.js'

export default class CSSString extends CSSToken {}

CSSString.fromTokenizer = function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSString({
		opener: text.slice(open, open + lead),
		value:  text.slice(open + lead, shut - tail),
		closer: text.slice(shut - tail, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}

const { prototype } = CSSString
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `opener`, `value`, `closer` ],
		configurable: true,
		writable:     true,
	},
})
