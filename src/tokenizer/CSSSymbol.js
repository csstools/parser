import * as t from '../shared/definitions.js'

export function isSymbol() {
	return true
}

export function consumeSymbol(ctx) {
	ctx.next()
	ctx.type = new CSSSymbol(ctx.text(0, 0))
}

export function CSSSymbol(value) {
	this.value = value
}
