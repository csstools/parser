import CSSToken from '../CSSToken.js'
import fromTokenizer from './CSSComment/fromTokenizer.js'

export default class CSSComment extends CSSToken {}

const { defineProperties } = Object

defineProperties(CSSComment, {
	fromTokenizer: {
		value:        fromTokenizer,
		configurable: true,
		enumerable:   true,
		writable:     true,
	},
})

defineProperties(CSSComment.prototype, {
	props: {
		value:        [ `opener`, `value`, `closer` ],
		configurable: true,
		writable:     true,
	},
})
