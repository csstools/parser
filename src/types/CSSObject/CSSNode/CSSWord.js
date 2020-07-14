import CSSNode from './CSSNode.js'

export default class CSSWord extends CSSNode {}

const { prototype } = CSSWord
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		value: String,
	},
	configurable: true,
	writable:     true,
})
