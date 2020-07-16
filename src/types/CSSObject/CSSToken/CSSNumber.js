import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSNumber.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSNumber(init) {
	assign(this, init)
}

defineClass(
	CSSNumber,
	CSSToken,
	{
		props: [ 6, [ `value`, `unit` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
