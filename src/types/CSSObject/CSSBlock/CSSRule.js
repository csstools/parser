import CSSBracketBlock from './CSSBracketBlock.js'

export default class CSSRule extends CSSBracketBlock {}

const { defineProperties } = Object

defineProperties(CSSRule.prototype, {
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
		enumerable:   true,
	},
})
