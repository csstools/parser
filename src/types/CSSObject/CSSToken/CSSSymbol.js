import CSSToken from './CSSToken.js'

export default class CSSSymbol extends CSSToken {}

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
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `value` ],
		configurable: true,
		writable:     true,
	},
})
