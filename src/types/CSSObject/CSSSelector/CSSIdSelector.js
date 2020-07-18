import CSSSelector from '../CSSSelector.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSIdSelector(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSIdSelector,
	CSSSelector,
	{
		isIdSelector: [ 6, true ],
		props:        [ 6, [ `symbol`, `value` ] ],
	}
)
