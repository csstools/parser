import CSSFunctionToken from './CSSFunctionToken.js'

export default function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSFunctionToken({
		value:  text.slice(open, shut - tail),
		symbol: `(`,
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}
