import * as t from '../shared/definitions.js'

export function isComment(ctx) {
	if (ctx.codeAt0 === t.SOLIDUS) {
		if (ctx.next() === t.ASTERISK) {
			return true
		}
		ctx.back()
	}
	return false
}

export function consumeComment(ctx) {
	while (ctx.next() !== -1) {
		if (
			ctx.codeAt0 === t.ASTERISK
			&& ctx.codeAt1 === t.SOLIDUS
		) {
			ctx.next()
			ctx.next()
			ctx.type = new CSSComment(ctx.text(2, 2))
			return
		}
	}
	ctx.type = new CSSComment(ctx.text(2, 0))
}

export function CSSComment(value) {
	this.opening = `/*`
	this.value = value
	this.closing = `*/`
}
