import CSSNumberToken from './CSSNumberToken.js'

export default function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSNumberToken({
		value:  text.slice(open, shut - tail),
		unit:   text.slice(shut - tail, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}
