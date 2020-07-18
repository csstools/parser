import CSSNode from './CSSNode.js'
import asJSON from '../../utils/as-json.js'
import asString from '../../utils/as-string.js'

import { assign, defineClass } from '../../utils/define.js'

export default function CSSBlock(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSBlock,
	CSSNode,
	{
		isBlock: [ 6, true ],
		props:   [ 6, [ `value` ] ],
		toJSON:  [ 6, function toJSON() {
			return asJSON(this.nodes, toJSON, this)
		} ],
		toString: [ 6, function toString() {
			return asString(this.nodes, this.props)
		} ],
		walk:  [ 6, walk ],
		value: [ 11, function () {
			return this.nodes.value
		} ],
	}
)

function walk(cb) {
	walkObject(this.nodes, cb)
}

function walkObject(object, cb) {
	return Object.keys(object).every((name) => {
		const value = object[name]

		return Array.isArray(value) ? walkArray(value, cb) : cb(value)
	})
}

function walkArray(array, cb) {
	return array.every((entry) => {
		if (entry.nodes) walkObject(entry.nodes, cb)

		return cb(entry) !== false
	})
}
