import CSSSelector from '../CSSSelector.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSCombinator(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSCombinator,
	CSSSelector,
	{
		isCombinator: [ 6, true ],
		props:        [ 6, [ `value` ] ],
		value:        [ 11, function () {
			return String(this.nodes.value)
		} ],
	}
)
