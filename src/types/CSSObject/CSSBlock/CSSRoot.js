import CSSBlock from '../CSSBlock.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSRoot(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSRoot,
	CSSBlock,
	{
		isRoot: [ 6, true ],
		props:  [ 6, [ `value` ] ],
	}
)
