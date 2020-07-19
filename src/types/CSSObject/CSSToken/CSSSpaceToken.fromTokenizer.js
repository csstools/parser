import CSSSpaceToken from './CSSSpaceToken.js'

export default function fromTokenizer(source, value) {
	const token = new CSSSpaceToken()
	token.value = value
	token.source = source
	return token
}
