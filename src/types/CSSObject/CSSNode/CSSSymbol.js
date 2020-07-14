import CSSNode from './CSSNode.js'

export default class CSSSymbol extends CSSNode {}

const { prototype } = CSSSymbol
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		value: String,
	},
	configurable: true,
	writable:     true,
})
