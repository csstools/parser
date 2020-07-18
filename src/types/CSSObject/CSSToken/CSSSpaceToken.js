import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSSpaceToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'
import { SPACE_TYPE } from '../../../utils/token-types.js'

export default function CSSSpaceToken(init) {
	assign(this, init)
}

defineClass(
	CSSSpaceToken,
	CSSToken,
	{
		isSpaceToken: [ 6, true ],
		type:         [ 6, SPACE_TYPE ],
		props:        [ 6, [ `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
