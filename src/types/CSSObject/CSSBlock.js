import CSSObject from '../CSSObject.js'
import asJSON from '../../utils/as-json.js'
import asString from '../../utils/as-string.js'

import { assign, defineClass } from '../../utils/define.js'

export default function CSSBlock(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSBlock,
	CSSObject,
	{
		props:  [ 6, [ `value` ] ],
		toJSON: [ 6, function toJSON() {
			return asJSON(this.nodes, toJSON)
		} ],
		toString: [ 6, function toString() {
			return asString(this.nodes, this.props)
		} ],
		value: [ 11, function () {
			return this.nodes.value
		} ],
	}
)
