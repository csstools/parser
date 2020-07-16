import CSSBracketBlock from './CSSBracketBlock.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSRule(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSRule,
	CSSBracketBlock,
	{
		props:   [ 6, [ `prelude`, `afterPrelude`, `opener`, `value`, `closer` ] ],
		prelude: [ 11, function () {
			return this.nodes.prelude
		} ],
	}
)
