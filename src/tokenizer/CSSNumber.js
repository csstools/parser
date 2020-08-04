import * as t from '../shared/definitions.js'
import * as CSSWord from './CSSWord.js'

export function isNumber(ctx) {
	return t.isDigit(ctx.codeAt0)
}

export function consumeNumber(ctx) {
	while (ctx.next() !== -1) {
		if (!t.isDigit(ctx.codeAt0)) {
			break
		}
	}
	ctx.type = new CSSNumber(ctx.text(0, 0))
	ctx.set = ctx.end
	if (CSSWord.isWord(ctx)) {
		CSSWord.consumeIdentLike(ctx)
		ctx.type.unit = ctx.text(0, 0)
	}
}

export function CSSNumber(value) {
	this.value = value
}
