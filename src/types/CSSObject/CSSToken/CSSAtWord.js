import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSAtWord.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSAtWord(init) {
	assign(this, init)
}

defineClass(
	CSSAtWord,
	CSSToken,
	{
		props: [ 6, [ `symbol`, `value` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
