import CSSAtToken from './CSSAtToken.js'

export default function fromTokenizer(source, value) {
	const token = new CSSAtToken()
	token.symbol = `@`
	token.value = value.slice(1)
	token.source = source
	return token
}
