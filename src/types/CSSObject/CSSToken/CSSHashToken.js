import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSHashToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSHashToken(init) {
	assign(this, init)
}

defineClass(
	CSSHashToken,
	CSSToken,
	{
		props: [ 6, [ `symbol`, `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
