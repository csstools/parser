import toString from '../../../utils/toString.js'

import CSSHost from './CSSHost.js'

import CSSComment from "../CSSNode/CSSComment.js"
import CSSSpace from "../CSSNode/CSSSpace.js"

export default class CSSFragment extends CSSHost {}

const { prototype } = CSSFragment
const { defineProperty } = Object

defineProperty(prototype, `items`, {
	get: function () {
		return this.nodes.value.length && this.nodes.value.filter(
			({ constructor }) => (
				constructor !== CSSComment
				&& constructor !== CSSSpace
			)
		)
	},
	configurable: true,
})

defineProperty(prototype, `toStringTypes`, {
	value: {
		value: toString,
	},
	configurable: true,
	writable:     true,
})
