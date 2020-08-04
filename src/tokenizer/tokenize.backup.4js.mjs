import * as t from '../shared/definitions.js'
import * as CSSComment from './CSSComment.js'
import * as CSSSpace from './CSSSpace.js'
import * as CSSSymbol from './CSSSymbol.js'
import * as CSSString from './CSSString.js'
import * as CSSWord from './CSSWord.js'
import * as CSSNumber from './CSSNumber.js'
import * as CSSAtWord from './CSSAtWord.js'
import * as CSSHash from './CSSHash.js'

export default function tokenize(/** @type {string} */ data) {
	// ...
	const ctx = { read, back, next, text, set: 0, end: 0 }
	const len = data.length
	// ...
	let cY = ctx.codeAtY = t.EOF
	let cZ = ctx.codeAtZ = t.EOF
	let c0 = ctx.codeAt0 = data.charCodeAt(0)
	let c1 = ctx.codeAt1 = data.charCodeAt(1)
	let c2 = ctx.codeAt2 = data.charCodeAt(2)
	// ...
	return ctx
	// ...
	function read() {
		if (ctx.end === len) return false
		ctx.set = ctx.end
		switch (true) {
			case CSSComment.isComment(ctx):
				CSSComment.consumeComment(ctx)
				break
			case CSSSpace.isSpace(ctx):
				CSSSpace.consumeSpace(ctx)
				break
			case CSSString.isString(ctx):
				CSSString.consumeString(ctx)
				break
			case CSSAtWord.isAtWord(ctx):
				CSSAtWord.consumeAtWord(ctx)
				break
			case CSSHash.isHash(ctx):
				CSSHash.consumeHash(ctx)
				break
			case CSSNumber.isNumber(ctx):
				CSSNumber.consumeNumber(ctx)
				break
			case CSSWord.isWord(ctx):
				CSSWord.consumeWord(ctx)
				break
			default:
				CSSSymbol.consumeSymbol(ctx)
				break
		}
		return true
	}
	// back
	function back() {
		if (ctx.end === 0) return t.EOF
		ctx.codeAt2 = c2 = c1
		ctx.codeAt1 = c1 = c0
		ctx.codeAt0 = c0 = cZ
		ctx.codeAtZ = cZ = cY
		ctx.codeAtY = cY = t.EOF
		--ctx.end
		return c0
	}
	// next
	function next() {
		if (ctx.end === len) return t.EOF
		ctx.codeAtY = cY = cZ
		ctx.codeAtZ = cZ = c0
		ctx.codeAt0 = c0 = c1
		ctx.codeAt1 = c1 = c2
		ctx.codeAt2 = c2 = data.charCodeAt(ctx.end + 3)
		++ctx.end
		return c0
	}
	// text
	function text(lead, tail) {
		return data.slice(ctx.set + lead, ctx.end - tail)
	}
}
