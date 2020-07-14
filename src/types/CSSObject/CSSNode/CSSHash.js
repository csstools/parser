import CSSNode from './CSSNode.js'

export default class CSSHash extends CSSNode {}

const { prototype } = CSSHash
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		symbol: String,
		value:  String,
	},
	configurable: true,
	writable:     true,
})
