import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSNumberToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'
import { NUMBER_TYPE } from '../../../utils/token-types.js'

export default function CSSNumberToken(init) {
	assign(this, init)
}

defineClass(
	CSSNumberToken,
	CSSToken,
	{
		isNumberToken: [ 6, true ],
		type:          [ 6, NUMBER_TYPE ],
		props:         [ 6, [ `value`, `unit` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
