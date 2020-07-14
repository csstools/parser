import toString from '../../../utils/toString.js'

import CSSRule from './CSSRule.js'

export default class CSSStyleRule extends CSSRule {
	constructor() {
		super({
			nodes: {
				prelude: [],
				value:   [],
			},
		})
	}
}

const { prototype } = CSSStyleRule
const { defineProperty } = Object

defineProperty(prototype, `toJsonTypes`, {
	value: {
		prelude: Object,
		value:   Object,
	},
	configurable: true,
	writable:     true,
})

defineProperty(prototype, `toStringTypes`, {
	value: {
		prelude: toString,
		value:   toString,
	},
	configurable: true,
	writable:     true,
})
