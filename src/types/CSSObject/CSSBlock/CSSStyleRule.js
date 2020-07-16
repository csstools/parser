import CSSRule from './CSSRule.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSStyleRule(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSStyleRule,
	CSSRule,
	{
		props:   [ 6, [ `prelude`, `afterPrelude`, `opener`, `value`, `closer` ] ],
		prelude: [ 11, function () {
			return this.nodes.prelude
		} ],
	}
)
