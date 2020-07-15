import CSSNode from './CSSNode.js'

export default class CSSFunctionWord extends CSSNode {}

CSSFunctionWord.fromTokenizer = function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSFunctionWord({
		value:  text.slice(open, shut - tail),
		symbol: `(`,
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}

const { prototype } = CSSFunctionWord
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `value`, `symbol` ],
		configurable: true,
		writable:     true,
	},
})
