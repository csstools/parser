import CSSSpace from './CSSSpace.js'

export default function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSSpace({
		value:  text.slice(open, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}
