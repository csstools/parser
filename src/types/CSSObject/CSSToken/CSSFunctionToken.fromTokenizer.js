import CSSFunctionToken from './CSSFunctionToken.js'

export default function fromTokenizer(source, value) {
	const token = new CSSFunctionToken()
	token.value = value.slice(0, -1)
	token.symbol = `(`
	token.source = source
	return token
}
