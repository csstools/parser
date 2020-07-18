import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSStringToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'
import { STRING_TYPE } from '../../../utils/token-types.js'

export default function CSSStringToken(init) {
	assign(this, init)
}

defineClass(
	CSSStringToken,
	CSSToken,
	{
		isStringToken: [ 6, true ],
		type:          [ 6, STRING_TYPE ],
		props:         [ 6, [ `opener`, `value`, `closer` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
