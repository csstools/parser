import toString from '../../../utils/toString.js'

import CSSFragment from './CSSFragment.js'

export default class CSSFunction extends CSSFragment {
	constructor() {
		super({
			nodes: {
				opener: [],
				value:  [],
				closer: [],
			},
		})
	}
}

const { prototype } = CSSFunction
const { defineProperty } = Object

defineProperty(prototype, `toJsonTypes`, {
	value: {
		opener: Object,
		value:  Object,
		closer: Object,
	},
	configurable: true,
	writable:     true,
})

defineProperty(prototype, `toStringTypes`, {
	value: {
		opener: toString,
		value:  toString,
		closer: toString,
	},
	configurable: true,
	writable:     true,
})

defineProperty(prototype, `name`, {
	get: function () {
		return this.nodes.opener.map((opener) => opener.value).join(``)
	},
	configurable: true,
})

defineProperty(prototype, `value`, {
	get: function () {
		return toString(this.nodes.value)
	},
	configurable: true,
})
