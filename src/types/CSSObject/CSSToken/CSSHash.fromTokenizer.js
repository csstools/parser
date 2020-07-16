import CSSHash from './CSSHash.js'

export default function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSHash({
		symbol: `#`,
		value:  text.slice(open + lead, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}
