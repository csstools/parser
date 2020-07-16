import CSSNumber from './CSSNumber.js'

export default function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSNumber({
		value:  text.slice(open, shut - tail),
		unit:   text.slice(shut - tail, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}
