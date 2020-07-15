import CSSToken from './CSSToken.js'

export default class CSSFunctionToken extends CSSToken {}

CSSFunctionToken.fromTokenizer = function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSFunctionToken({
		value:  text.slice(open, shut - tail),
		symbol: `(`,
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}

const { prototype } = CSSFunctionToken
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `value`, `symbol` ],
		configurable: true,
		writable:     true,
	},
})
