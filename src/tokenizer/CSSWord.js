import * as t from '../shared/definitions.js'

export function isWord(ctx) {
	return t.isIdentifierStart(ctx.codeAt0)
}

export function consumeWord(ctx) {
	consumeIdentLike(ctx)
	ctx.type = new CSSWord(ctx.text(0, 0))
}

export function consumeIdentLike(ctx) {
	while (ctx.next() !== t.EOF) {
		if (t.isIdentifier(ctx.codeAt0)) {
			continue
		} else {
			break
		}
	}
}

export function CSSWord(value) {
	this.value = value
}
