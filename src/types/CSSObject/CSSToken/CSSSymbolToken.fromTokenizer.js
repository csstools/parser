import CSSSymbolToken from './CSSSymbolToken.js'

export default function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	const value = text[open]

	return new CSSSymbolToken({
		value,
		type:   value.charCodeAt(0),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}
