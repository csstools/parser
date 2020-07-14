import CSSNode from '../CSSNode.js.js'

export default class CSSAtWord extends CSSNode {}

CSSAtWord.fromToken = fromToken

const { create, defineProperty } = Object
const { prototype } = CSSAtWord

export function fromToken(source, text, open, shut) {
	const token = create(prototype)
	token.source = source
	token.value = text.slice(open + 1, shut)
	return token
}

defineProperty(prototype, `keys`, { value: [`symbol`, `value`], configurable: true })
defineProperty(prototype, `symbol`, { value: `@`, configurable: true })
defineProperty(prototype, `value`, { value: `--`, configurable: true, writable: true })
