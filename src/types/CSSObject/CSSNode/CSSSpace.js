import CSSNode from './CSSNode.js'

export default class CSSSpace extends CSSNode {}

const { prototype } = CSSSpace
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		value: String,
	},
	configurable: true,
	writable:     true,
})
