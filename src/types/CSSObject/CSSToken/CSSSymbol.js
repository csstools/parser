import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSSymbol.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSSymbol(init) {
	assign(this, init)
}

defineClass(
	CSSSymbol,
	CSSToken,
	{
		props: [ 6, [ `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
