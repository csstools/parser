import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSWordToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSWord(init) {
	assign(this, init)
}

defineClass(
	CSSWord,
	CSSToken,
	{
		props: [ 6, [ `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
