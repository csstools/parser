import * as t from '../shared/definitions.js'
import * as CSSWord from './CSSWord.js'

export function isAtWord(ctx) {
	if (ctx.codeAt0 === t.COMMERCIAL_AT) {
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

export function consumeAtWord(ctx) {
	CSSWord.consumeIdentLike(ctx)
	ctx.type = new CSSAtWord(ctx.text(1, 0))
}

export function CSSAtWord(value) {
	this.prefix = `@`
	this.value = value
}
