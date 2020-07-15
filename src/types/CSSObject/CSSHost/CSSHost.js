import CSSNode from '../CSSNode/CSSNode.js'
import { asJSON, asString } from '../CSSObject.js'

const { defineProperties } = Object

export default class CSSHost extends CSSNode {
	constructor(nodes) {
		super({ nodes })
	}
}

defineProperties(CSSHost.prototype, {
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
})

function toJSON() {
	return asJSON(this.nodes, toJSON)
}

function toString() {
	return asString(this.nodes, this.props)
}
