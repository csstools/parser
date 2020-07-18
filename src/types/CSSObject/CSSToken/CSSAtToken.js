import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSAtToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'
import { ATWORD_TYPE } from '../../../utils/token-types.js'

export default function CSSAtToken(init) {
	assign(this, init)
}

defineClass(
	CSSAtToken,
	CSSToken,
	{
		isAtToken: [ 6, true ],
		type:      [ 6, ATWORD_TYPE ],
		props:     [ 6, [ `symbol`, `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
