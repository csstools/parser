import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSFunctionToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSFunctionToken(init) {
	assign(this, init)
}

defineClass(
	CSSFunctionToken,
	CSSToken,
	{
		props: [ 6, [ `value`, `symbol` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
