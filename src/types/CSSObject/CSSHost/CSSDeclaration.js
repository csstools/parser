import CSSHost from './CSSHost.js'

export default class CSSDeclaration extends CSSHost {}

const { prototype } = CSSDeclaration
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `name`, `afterName`, `opener`, `afterOpener`, `value`, `afterValue`, `important`, `afterImportant`, `closer` ],
		configurable: true,
		writable:     true,
	},
	name: {
		get: function () {
			return this.nodes.name
		},
		configurable: true,
	},
	value: {
		get: function () {
			return this.nodes.value
		},
		configurable: true,
	},
	important: {
		get: function () {
			return this.nodes.important
		},
		configurable: true,
	},
})
