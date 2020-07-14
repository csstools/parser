import CSSNode from './CSSNode.js'

export default class CSSAtWord extends CSSNode {}

const { prototype } = CSSAtWord
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		symbol: String,
		value:  String,
	},
	configurable: true,
	writable:     true,
})
