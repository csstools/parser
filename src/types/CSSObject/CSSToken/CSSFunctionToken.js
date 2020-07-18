import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSFunctionToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'
import { FUNCTION_TYPE } from '../../../utils/token-types.js'

export default function CSSFunctionToken(init) {
	assign(this, init)
}

defineClass(
	CSSFunctionToken,
	CSSToken,
	{
		isFunctionToken: [ 6, true ],
		type:            [ 6, FUNCTION_TYPE ],
		props:           [ 6, [ `value`, `symbol` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
