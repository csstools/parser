import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSHash.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSHash(init) {
	assign(this, init)
}

defineClass(
	CSSHash,
	CSSToken,
	{
		props: [ 6, [ `symbol`, `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
