import CSSNode from './CSSNode.js'

export default class CSSComment extends CSSNode {}

CSSComment.fromTokenizer = function fromTokenizer(text, open, shut, lead, tail, line, lcol, input) {
	return new CSSComment({
		opener: text.slice(open, open + lead),
		value:  text.slice(open + lead, shut - tail),
		closer: text.slice(shut - tail, shut),
		source: {
			input,
			position: [ line, lcol ],
		},
	})
}

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
