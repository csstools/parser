import CSSObject from '../CSSObject.js'
import { asJSON } from './prototype/toJSON.js'
import { asString } from './prototype/toString.js'

export default class CSSBlock extends CSSObject {
	constructor(nodes) {
		super({ nodes })
	}
}

const { defineProperties } = Object

defineProperties(CSSBlock.prototype, {
	toJSON: {
		value:        toJSON,
		configurable: true,
		writable:     true,
	},
	toString: {
		value:        toString,
		configurable: true,
		writable:     true,
	},
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
		enumerable:   true,
	},
})

function toJSON() {
	return asJSON(this.nodes, toJSON)
}

function toString() {
	return asString(this.nodes, this.props)
}
