import CSSHost from './CSSHost.js'

export default class CSSFragment extends CSSHost {}

const { prototype } = CSSFragment
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `value` ],
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
