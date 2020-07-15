import CSSBlock from './CSSBlock.js'

export default class CSSDeclaration extends CSSBlock {}

const { defineProperties } = Object

defineProperties(CSSDeclaration.prototype, {
	props: {
		value:        [ `name`, `afterName`, `opener`, `afterOpener`, `value`, `afterValue`, `important`, `afterImportant`, `closer` ],
		configurable: true,
		writable:     true,
	},
	name: {
		get: function () {
			return this.nodes.name.value
		},
		configurable: true,
		enumerable:   true,
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
	important: {
		get: function () {
			return String(this.nodes.important)
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
