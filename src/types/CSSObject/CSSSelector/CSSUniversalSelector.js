import CSSSelector from '../CSSSelector.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSUniversalSelector(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSUniversalSelector,
	CSSSelector,
	{
		isUniversalSelector: [ 6, true ],
		props:               [ 6, [ `value` ] ],
	}
)
