import CSSRule from './CSSRule.js'

export default class CSSAtRule extends CSSRule {}

const { prototype } = CSSAtRule
const { defineProperties } = Object

defineProperties(prototype, {
	props: {
		value:        [ `name`, `afterName`, `prelude`, `afterPrelude`, `opener`, `value`, `closer` ],
		configurable: true,
		writable:     true,
	},
	name: {
		get: function () {
			return this.nodes.name
		},
		configurable: true,
	},
	prelude: {
		get: function () {
			return this.nodes.prelude
		},
		configurable: true,
	},
})
