import CSSSelector from '../CSSSelector.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSPseudoSelector(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSPseudoSelector,
	CSSSelector,
	{
		isPseudoSelector: [ 6, true ],
		props:            [ 6, [ `symbol`, `value` ] ],
	}
)
