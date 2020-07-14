import CSSNode from './CSSNode.js'

export default class CSSFunctionWord extends CSSNode {}

const { prototype } = CSSFunctionWord
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		value:  String,
		symbol: String,
	},
	configurable: true,
	writable:     true,
})
