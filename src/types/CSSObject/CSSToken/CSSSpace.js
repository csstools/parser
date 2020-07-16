import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSSpace.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSSpace(init) {
	assign(this, init)
}

defineClass(
	CSSSpace,
	CSSToken,
	{
		props: [ 6, [ `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
