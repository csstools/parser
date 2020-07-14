import toString from '../../../utils/toString.js'

import CSSFragment from './CSSFragment.js'

export default class CSSBlock extends CSSFragment {
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

const { prototype } = CSSBlock
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
