import toString from '../../../utils/toString.js'

import CSSFragment from './CSSFragment.js'

export default class CSSRoot extends CSSFragment {
	constructor() {
		super({
			nodes: {
				value: [],
			},
		})
	}
}

const { prototype } = CSSRoot
const { defineProperty } = Object

defineProperty(prototype, `toJsonTypes`, {
	value: {
		value: Object,
	},
	configurable: true,
	writable:     true,
})

defineProperty(prototype, `toStringTypes`, {
	value: {
		value: toString,
	},
	configurable: true,
	writable:     true,
})
