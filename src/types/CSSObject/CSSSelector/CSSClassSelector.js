import CSSSelector from '../CSSSelector.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSClassSelector(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSClassSelector,
	CSSSelector,
	{
		isClassSelector: [ 6, true ],
		props:           [ 6, [ `symbol`, `value` ] ],
	}
)
