import CSSSymbol from './CSSSymbol.js'

export default function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSSymbol({
		value:  text.slice(open, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}
