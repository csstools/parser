import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSAtToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSAtToken(init) {
	assign(this, init)
}

defineClass(
	CSSAtToken,
	CSSToken,
	{
		props: [ 6, [ `symbol`, `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
