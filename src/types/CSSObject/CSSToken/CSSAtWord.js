import CSSToken from './CSSToken.js'
import fromTokenizer from './CSSAtWord/fromTokenizer.js'

export default class CSSAtWord extends CSSToken {}

const { defineProperties } = Object

defineProperties(CSSAtWord, {
	fromTokenizer: {
		value:        fromTokenizer,
		configurable: true,
		enumerable:   true,
		writable:     true,
	},
})

defineProperties(CSSAtWord.prototype, {
	props: {
		value:        [ `symbol`, `value` ],
		configurable: true,
		writable:     true,
	},
})
