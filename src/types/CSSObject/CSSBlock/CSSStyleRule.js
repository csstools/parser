import CSSRule from './CSSRule.js'

export default class CSSStyleRule extends CSSRule {}

const { defineProperties } = Object

defineProperties(CSSStyleRule.prototype, {
	props: {
		value:        [ `prelude`, `afterPrelude`, `opener`, `value`, `closer` ],
		configurable: true,
		writable:     true,
	},
})
