import CSSRule from './CSSRule.js'
import fromTokenizer from './CSSAtRule.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSAtRule(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSAtRule,
	CSSRule,
	{
		props: [ 6, [ `name`, `afterName`, `prelude`, `afterPrelude`, `opener`, `value`, `closer` ] ],
		name:  [ 11, function () {
			return String(this.nodes.name.value).slice(0, -1)
		} ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
