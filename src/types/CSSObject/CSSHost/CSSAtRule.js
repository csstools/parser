import toString from '../../../utils/toString.js'

import CSSRule from './CSSRule.js'

export default class CSSAtRule extends CSSRule {
	constructor() {
		super({
			nodes: {
				name:         [],
				afterName:    [],
				prelude:      [],
				afterPrelude: [],
				value:        [],
			},
		})
	}
}

const { prototype } = CSSAtRule
const { defineProperty } = Object

defineProperty(prototype, `toJsonTypes`, {
	value: {
		name:         Object,
		afterName:    Object,
		prelude:      Object,
		afterPrelude: Object,
		value:        Object,
	},
	configurable: true,
	writable:     true,
})

defineProperty(prototype, `toStringTypes`, {
	value: {
		name:         toString,
		afterName:    toString,
		prelude:      toString,
		afterPrelude: toString,
		value:        toString,
	},
	configurable: true,
	writable:     true,
})

defineProperty(prototype, `name`, {
	get: function () {
		return toString(this.nodes.name.map((node) => node.value))
	},
	configurable: true,
})

defineProperty(prototype, `prelude`, {
	get: function () {
		return toString(this.nodes.prelude)
	},
	configurable: true,
})
