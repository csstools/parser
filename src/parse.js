/* Character Codes */
import {
	L_RB,
	L_SB,
	L_CB,
	R_RB,
	R_SB,
	R_CB,
} from './utils/code-points.js'

/* Token Identifiers */
import {
	ATWORD_TYPE,
	COMMENT_TYPE,
	FUNCTION_TYPE,
	HASH_TYPE,
	NUMBER_TYPE,
	SPACE_TYPE,
	STRING_TYPE,
	WORD_TYPE,
} from './utils/token-types.js'

import RofL from './utils/string-variants.js'
import tokenize from './tokenize.js'
import { defineClass } from './utils/define.js'

function CSSList() {} defineClass(CSSList, Array, {
	isList: [ 2, true ],
})
function CSSValue() {} defineClass(CSSValue, Object, {
	isValue: [ 2, true ],
})
function CSSAtWord() {} defineClass(CSSAtWord, CSSValue, {
	toString: [ 6, function toString() {
		return ``.concat(this.symbol, this.value)
	} ],
	isAtWord: [ 2, true ],
	symbol:   [ 7, `@` ],
})
function CSSComment() {} defineClass(CSSComment, CSSValue, {
	toString: [ 6, function toString() {
		return ``.concat(this.opener, this.value, this.closer)
	} ],
	isComment: [ 2, true ],
	opener:    [ 7, `/*` ],
})
function CSSFragment() {} defineClass(CSSFragment, CSSValue, {
	toString: [ 6, function toString() {
		return this.value.join(``)
	} ],
	isFragment: [ 2, true ],
	value:      [ 7, [] ],
})
function CSSBlock() {} defineClass(CSSBlock, CSSFragment, {
	toString: [ 6, function toString() {
		return ``.concat(this.opener, this.value.join(``), this.closer)
	} ],
	isBlock: [ 2, true ],
	opener:  [ 7, `(` ],
	closer:  [ 7, `)` ],
})
function CSSFunction() {} defineClass(CSSFunction, CSSBlock, {
	toString: [ 6, function toString() {
		return ``.concat(this.name, this.opener, this.value.join(``), this.closer)
	} ],
	isFunction: [ 2, true ],
})
function CSSHash() {} defineClass(CSSHash, CSSValue, {
	toString: [ 6, function toString() {
		return ``.concat(this.symbol, this.value)
	} ],
	isAtWord: [ 2, true ],
	symbol:   [ 7, `#` ],
})
function CSSNumber() {} defineClass(CSSNumber, CSSValue, {
	toString: [ 6, function toString() {
		return ``.concat(this.value, this.unit)
	} ],
	isNumber: [ 2, true ],
})
function CSSSpace() {} defineClass(CSSSpace, CSSValue, {
	toString: [ 6, function toString() {
		return this.value
	} ],
	isSpace: [ 2, true ],
})
function CSSString() {} defineClass(CSSString, CSSValue, {
	toString: [ 6, function toString() {
		return ``.concat(this.opener, this.value, this.closer)
	} ],
	isString: [ 2, true ],
})
function CSSWord() {} defineClass(CSSWord, CSSValue, {
	toString: [ 6, function toString() {
		return this.value
	} ],
	isWord: [ 2, true ],
})
function CSSSymbol() {} defineClass(CSSSymbol, CSSValue, {
	toString: [ 6, function toString() {
		return this.value
	} ],
	isSymbol: [ 2, true ],
})

const { create } = Object
const createCSSAtWord = create.bind(Object, CSSAtWord.prototype)
const createCSSComment = create.bind(Object, CSSComment.prototype)
const createCSSFragment = create.bind(Object, CSSFragment.prototype)
const createCSSBlock = create.bind(Object, CSSBlock.prototype)
const createCSSFunction = create.bind(Object, CSSFunction.prototype)
const createCSSHash = create.bind(Object, CSSHash.prototype)
const createCSSNumber = create.bind(Object, CSSNumber.prototype)
const createCSSSpace = create.bind(Object, CSSSpace.prototype)
const createCSSString = create.bind(Object, CSSString.prototype)
const createCSSWord = create.bind(Object, CSSWord.prototype)
const createCSSSymbol = create.bind(Object, CSSSymbol.prototype)

export default function parse(cssText) {
	const tokenizer = tokenize(cssText)

	let deep = parser.deep = 0
	let parserOpen
	let parserShut
	let node
	let list = []
	let fore = parser.root = createCSSFragment()
	fore.value = list

	return parser

	function parser() {
		if (tokenizer() === false) return false

		parserOpen = false
		parserShut = false

		switch (tokenizer.type) {
			case ATWORD_TYPE:
				node = createCSSAtWord()
				node.value = tokenizer.getText()
				node.parent = fore
				node.source = { position: tokenizer.smap }
				break

			case COMMENT_TYPE:
				node = createCSSComment()
				node.opener = `/*`
				node.value = tokenizer.getText()
				node.closer = tokenizer.getTail()
				node.parent = fore
				node.source = { position: tokenizer.smap }
				break

			case FUNCTION_TYPE:
				node = createCSSFunction()
				node.name = tokenizer.getText()
				node.opener = `(`
				node.value = []
				node.closer = ``
				node.parent = fore
				node.source = { position: tokenizer.smap }
				parserOpen = true
				break

			case HASH_TYPE:
				node = createCSSHash()
				node.value = tokenizer.getText()
				node.parent = fore
				node.source = { position: tokenizer.smap }
				break

			case NUMBER_TYPE:
				node = createCSSNumber()
				node.value = tokenizer.getText()
				node.unit = tokenizer.getTail()
				node.parent = fore
				node.source = { position: tokenizer.smap }
				break

			case SPACE_TYPE:
				node = createCSSSpace()
				node.value = tokenizer.getText()
				node.parent = fore
				node.source = { position: tokenizer.smap }
				break

			case STRING_TYPE:
				node = createCSSString()
				node.opener = tokenizer.getLead()
				node.value = tokenizer.getText()
				node.closer = tokenizer.getTail()
				node.parent = fore
				node.source = { position: tokenizer.smap }
				break

			case WORD_TYPE:
				node = createCSSWord()
				node.value = tokenizer.getText()
				node.parent = fore
				node.source = { position: tokenizer.smap }
				break

			case L_RB:
			case L_SB:
			case L_CB:
				node = createCSSBlock()
				node.opener = String.fromCharCode(tokenizer.type)
				node.value = []
				node.closer = ``
				node.parent = fore
				node.source = { position: tokenizer.smap }
				parserOpen = true
				parser.deep = ++deep
				break

			case R_RB:
			case R_SB:
			case R_CB:
				if (RofL[tokenizer.type] === fore.opener) {
					node = fore
					node.closer = String.fromCharCode(tokenizer.type)
					parserShut = true
					parser.deep = --deep
					break
				}

			default:
				node = createCSSSymbol()
				node.value = tokenizer.getChar()
				node.parent = fore
				node.source = { position: tokenizer.smap }
				break
		}

		if (parserShut) {
			fore = parser.fore = node.parent
			list = parser.list = fore.value
		} else {
			list.push(node)

			if (parserOpen) {
				fore = node
				list = fore.value
			}
		}

		parser.node = node
		parser.open = parserOpen
		parser.shut = parserShut

		return true
	}
}
