import CSSSelector from '../CSSSelector.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSComplexSelector(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSComplexSelector,
	CSSSelector,
	{
		isComplexSelector: [ 6, true ],
		props:             [ 6, [ `value` ] ],
	}
)
