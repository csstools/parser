import CSSHashToken from './CSSHashToken.js'

export default function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSHashToken({
		symbol: `#`,
		value:  text.slice(open + lead, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}
