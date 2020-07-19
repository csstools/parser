import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSCommentToken.fromTokenizer.js'

import { defineClass } from '../../../utils/define.js'
import { COMMENT_TYPE } from '../../../utils/token-types.js'

export default function CSSCommentToken() {}

defineClass(
	CSSCommentToken,
	CSSToken,
	{
		isCommentToken: [ 6, true ],
		type:           [ 6, COMMENT_TYPE ],
		props:          [ 6, [ `opener`, `value`, `closer` ] ],
	},
	{
		fromTokenizer: [ 7, fromTokenizer ],
	}
)
