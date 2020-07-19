import CSSSymbolToken from './CSSSymbolToken.js'

export default function fromTokenizer(source, value) {
	const token = new CSSSymbolToken()
	token.value = value
	token.source = source
	return token
}
