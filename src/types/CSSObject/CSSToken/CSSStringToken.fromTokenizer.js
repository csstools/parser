import CSSStringToken from './CSSStringToken.js'

export default function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSStringToken({
		opener: text.slice(open, open + lead),
		value:  text.slice(open + lead, shut - tail),
		closer: text.slice(shut - tail, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}
