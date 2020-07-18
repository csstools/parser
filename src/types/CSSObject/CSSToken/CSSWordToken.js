import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSWordToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'
import { WORD_TYPE } from '../../../utils/token-types.js'

export default function CSSWord(init) {
	assign(this, init)
}

defineClass(
	CSSWord,
	CSSToken,
	{
		isWordToken: [ 6, true ],
		type:        [ 6, WORD_TYPE ],
		props:       [ 6, [ `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
