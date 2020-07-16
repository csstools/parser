import CSSObject from '../CSSObject.js'

import { assign, defineClass } from '../../utils/define.js'

export default function CSSToken(init) {
	assign(this, init)
}

defineClass(
	CSSToken,
	CSSObject
)
