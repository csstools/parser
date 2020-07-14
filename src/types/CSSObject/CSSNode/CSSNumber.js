import CSSNode from './CSSNode.js'

export default class CSSNumber extends CSSNode {}

const { prototype } = CSSNumber
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		value: String,
		unit:  String,
	},
	configurable: true,
	writable:     true,
})
