import CSSNode from './CSSNode.js'

import { assign, defineClass } from '../../utils/define.js'

export default function CSSToken(init) {
	assign(this, init)
}

defineClass(
	CSSToken,
	CSSNode,
	{
		isToken: [ 6, true ],
	}
)
