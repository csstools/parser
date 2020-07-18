import CSSBracketBlock from './CSSBracketBlock.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSFunction(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSFunction,
	CSSBracketBlock,
	{
		isFunction: [ 6, true ],
		props:      [ 6, [ `opener`, `value`, `closer` ] ],
		name:       [ 11, function () {
			return String(this.nodes.opener).slice(0, -1)
		} ],
	}
)
