import CSSRule from './CSSRule.js'

export default class CSSStyleRule extends CSSRule {}

const { prototype } = CSSStyleRule
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `prelude`, `afterPrelude`, `opener`, `value`, `closer` ],
		configurable: true,
		writable:     true,
	},
	prelude: {
		get: function () {
			return this.nodes.prelude
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
