import CSSBlock from '../CSSBlock.js'
import fromTokenizer from './CSSBracketBlock.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSBracketBlock(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSBracketBlock,
	CSSBlock,
	{
		isBracketBlock: [ 6, true ],
		props:          [ 6, [ `opener`, `value`, `closer` ] ],
		opener:         [ 11, function () {
			return String(this.nodes.opener)
		} ],
		value: [ 11, function () {
			return this.nodes.value
		} ],
		closer: [ 11, function () {
			return String(this.nodes.closer)
		} ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
