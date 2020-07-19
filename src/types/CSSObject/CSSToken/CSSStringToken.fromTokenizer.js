import CSSStringToken from './CSSStringToken.js'

export default function fromTokenizer(source, value, lead, tail) {
	const token = new CSSStringToken()
	token.opener = value.charAt(0)
	token.value = tail === 0 ? value : value.slice(lead, 0 - tail)
	token.closer = tail === 0 ? `` : value.slice(0 - tail)
	token.source = source
	return token
}
