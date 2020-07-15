import CSSToken from '../CSSToken.js'

export default class CSSHash extends CSSToken {}

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
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `symbol`, `value` ],
		configurable: true,
		writable:     true,
	},
})
