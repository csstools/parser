import CSSNumberToken from './CSSNumberToken.js'

export default function fromTokenizer(source, value, lead, tail) {
	const token = new CSSNumberToken()
	token.value = tail === 0 ? value : value.slice(0, 0 - tail)
	token.unit = tail === 0 ? `` : value.slice(0 - tail)
	token.source = source
	return token
}
