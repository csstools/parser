import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSNumberToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSNumberToken(init) {
	assign(this, init)
}

defineClass(
	CSSNumberToken,
	CSSToken,
	{
		props: [ 6, [ `value`, `unit` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
