import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSSpaceToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSSpaceToken(init) {
	assign(this, init)
}

defineClass(
	CSSSpaceToken,
	CSSToken,
	{
		props: [ 6, [ `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
