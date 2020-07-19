import CSSHashToken from './CSSHashToken.js'

export default function fromTokenizer(source, value) {
	const token = new CSSHashToken()
	token.symbol = `#`
	token.value = value.slice(1)
	token.source = source
	return token
}
