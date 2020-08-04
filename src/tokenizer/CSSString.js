import * as t from '../shared/definitions.js'

export function isString(ctx) {
	return (
		ctx.codeAt0 === t.QUOTATION_MARK
		|| ctx.codeAt0 === t.APOSTROPHE
	)
}

export function consumeString(ctx) {
	const codeAtEnd = ctx.codeAt0
	while (ctx.next() !== t.EOF) {
		if (ctx.codeAt0 === codeAtEnd) {
			ctx.next()
			ctx.type = new CSSString(ctx.text(1, 1), `"`)
			return
		}
	}
	ctx.type = new CSSString(ctx.text(1, 0), `"`)
	ctx.type.suffix = ``
}

export function CSSString(value, symbol) {
	symbol = symbol === t.APOSTROPHE ? `'` : `"`
	this.prefix = symbol
	this.value = value
	this.suffix = symbol
}
