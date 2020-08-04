import * as t from '../shared/definitions.js'

export function isSpace(ctx) {
	return t.isSpace(ctx.codeAt0)
}

export function consumeSpace(ctx) {
	while (ctx.next() !== -1) if (!t.isSpace(ctx.codeAt0)) break
	ctx.type = new CSSSpace(ctx.text(0, 0))
}

export function CSSSpace(value) {
	this.value = value
}
