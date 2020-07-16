import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSSymbolToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSSymbolToken(init) {
	assign(this, init)
}

defineClass(
	CSSSymbolToken,
	CSSToken,
	{
		props: [ 6, [ `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
