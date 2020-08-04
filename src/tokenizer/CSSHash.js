import * as t from '../shared/definitions.js'
import * as CSSWord from './CSSWord.js'

export function isHash(ctx) {
	if (ctx.codeAt0 === t.NUMBER_SIGN) {
		if (
			ctx.next() !== t.EOF
			&& CSSWord.isWord(ctx)
		) {
			return true
		}
		ctx.back()
	}
	return false
}

export function consumeHash(ctx) {
	CSSWord.consumeIdentLike(ctx)
	ctx.type = new CSSHash(ctx.text(1, 0))
}

export function CSSHash(value) {
	this.prefix = `#`
	this.value = value
}
