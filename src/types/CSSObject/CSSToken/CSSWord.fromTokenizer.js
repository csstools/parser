import CSSWord from './CSSWord.js'

export default function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSWord({
		value:  text.slice(open, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}
