import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSCommentToken.fromTokenizer.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSCommentToken(init) {
	assign(this, init)
}

defineClass(
	CSSCommentToken,
	CSSToken,
	{
		props: [ 6, [ `opener`, `value`, `closer` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
