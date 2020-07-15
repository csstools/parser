import CSSBlock from '../CSSBlock.js'

export default class CSSBracketBlock extends CSSBlock {}

const { defineProperties } = Object

defineProperties(CSSBracketBlock.prototype, {
	props: {
		value:        [ `opener`, `value`, `closer` ],
		configurable: true,
		writable:     true,
	},
	opener: {
		get: function () {
			return String(this.nodes.opener)
		},
		configurable: true,
		enumerable:   true,
	},
	value: {
		get: function () {
			return this.nodes.value
		},
		configurable: true,
		enumerable:   true,
	},
	closer: {
		get: function () {
			return String(this.nodes.closer)
		},
		configurable: true,
		enumerable:   true,
	},
})
