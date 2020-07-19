import CSSCommentToken from './CSSCommentToken.js'

export default function fromTokenizer(source, value, lead, tail) {
	const token = new CSSCommentToken()
	token.opener = `/*`
	token.value = tail === 0 ? value : value.slice(lead, 0 - tail)
	token.closer = tail === 0 ? `` : value.slice(0 - tail)
	token.source = source
	return token
}
