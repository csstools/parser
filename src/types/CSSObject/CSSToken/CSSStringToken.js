import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSStringToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSStringToken(init) {
	assign(this, init)
}

defineClass(
	CSSStringToken,
	CSSToken,
	{
		props: [ 6, [ `opener`, `value`, `closer` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
