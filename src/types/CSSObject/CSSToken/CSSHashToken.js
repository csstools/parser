import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSHashToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'
import { HASH_TYPE } from '../../../utils/token-types.js'

export default function CSSHashToken(init) {
	assign(this, init)
}

defineClass(
	CSSHashToken,
	CSSToken,
	{
		isHashToken: [ 6, true ],
		type:        [ 6, HASH_TYPE ],
		props:       [ 6, [ `symbol`, `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
