import CSSNode from './CSSNode.js'

export default class CSSComment extends CSSNode {}

const { prototype } = CSSComment
const { defineProperty } = Object

defineProperty(prototype, `toStringTypes`, {
	value: {
		opener: String,
		value:  String,
		closer: String,
	},
	configurable: true,
	writable:     true,
})
