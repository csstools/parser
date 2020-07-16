import asJSON from '../utils/as-json.js'
import asString from '../utils/as-string.js'

import { assign, defineClass } from '../utils/define.js'

export default defineClass(function CSSObject(init) {
	assign(this, init)
}, Object, {
	toJSON: [ 6, function toJSON() {
		return asJSON(this, toJSON)
	} ],
	toString: [ 6, function toString() {
		return asString(this, this.props)
	} ],
})
