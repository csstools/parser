import CSSNode from './CSSNode.js'
import asJSON from '../../utils/as-json.js'
import asString from '../../utils/as-string.js'

import { assign, defineClass } from '../../utils/define.js'

export default function CSSSelector(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSSelector,
	CSSNode,
	{
		isSelector: [ 6, true ],
		props:      [ 6, [ `value` ] ],
		toJSON:     [ 6, function toJSON() {
			return asJSON(this.nodes, toJSON, this)
		} ],
		toString: [ 6, function toString() {
			return asString(this.nodes, this.props)
		} ],
	}
)
