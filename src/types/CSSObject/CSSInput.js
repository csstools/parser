import CSSObject from '../CSSObject.js'

import { defineClass } from '../../utils/define.js'

export default function CSSInput(data, file) {
	this.file = file == null ? `-` : String(file)
	this.data = data == null ? `` : String(data)
}

defineClass(
	CSSInput,
	CSSObject
)
