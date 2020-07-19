import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSSymbolToken.fromTokenizer.js'

import { defineClass } from '../../../utils/define.js'

export default function CSSSymbolToken() {}

defineClass(
	CSSSymbolToken,
	CSSToken,
	{
		isSymbolToken: [ 6, true ],
		props:         [ 6, [ `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
