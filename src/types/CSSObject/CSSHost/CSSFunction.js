import CSSFragment from './CSSFragment.js'

export default class CSSFunction extends CSSFragment {}

const { prototype } = CSSFunction
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `opener`, `value`, `closer` ],
		configurable: true,
		writable:     true,
	},
	name: {
		get: function () {
			return this.nodes.opener
		},
		configurable: true,
	},
	value: {
		get: function () {
			return this.nodes.value
		},
		configurable: true,
	},
})
