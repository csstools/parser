import CSSWordToken from './CSSWordToken.js'

export default function fromTokenizer(source, value) {
	const token = new CSSWordToken()
	token.value = value
	token.source = source
	return token
}
