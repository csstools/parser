import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSString.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSString(init) {
	assign(this, init)
}

defineClass(
	CSSString,
	CSSToken,
	{
		props: [ 6, [ `opener`, `value`, `closer` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
