import asJSON from '../../utils/as-json.js'
import asString from '../../utils/as-string.js'

import { assign, defineClass } from '../../utils/define.js'

import CSSObject from '../CSSObject.js'

export default function CSSNode(init) {
	assign(this, init)
}

defineClass(
	CSSNode,
	CSSObject,
	{
		isNode:      [ 6, true ],
		replaceWith: [ 6, function replaceWith() {
			// if (this.parent)
		} ],
		toJSON: [ 6, function toJSON() {
			return asJSON(this, toJSON, this)
		} ],
		toString: [ 6, function toString() {
			return asString(this, this.props)
		} ],
	}
)
