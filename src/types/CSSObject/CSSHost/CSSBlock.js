import CSSFragment from './CSSFragment.js'

export default class CSSBlock extends CSSFragment {}

const { prototype } = CSSBlock
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `opener`, `value`, `closer` ],
		configurable: true,
		writable:     true,
	},
	value: {
		get: function () {
			return this.nodes.value
		},
		configurable: true,
	},
})
