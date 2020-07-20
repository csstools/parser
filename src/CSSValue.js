import {
	defineClass2,
	toDescriptor2,
} from './utils/define.js'

/**
 * CSS Value
 */
export function CSSValue() {}

defineClass2(CSSValue, Object, {
	constructor: toDescriptor2(CSSValue),
	isValue:     toDescriptor2(true),
})

/**
 * CSS AtWord Value
 */
export function CSSAtWord() {}

defineClass2(CSSAtWord, CSSValue, {
	constructor: toDescriptor2(CSSAtWord),
	toString:    toDescriptor2(function toString() {
		return ``.concat(this.symbol, this.value)
	}, true),
	isAtWord: toDescriptor2(true, true),
})

/**
 * CSS Comment Value
 */
export function CSSComment() {}

defineClass2(CSSComment, CSSValue, {
	constructor: toDescriptor2(CSSComment),
	toString:    toDescriptor2(function toString() {
		return ``.concat(this.opener, this.value, this.closer)
	}, true),
	isNil:     toDescriptor2(true, true),
	isComment: toDescriptor2(true, true),
})

/**
 * CSS Fragment Value
 */
export function CSSFragment() {}

defineClass2(CSSFragment, CSSValue, {
	constructor: toDescriptor2(CSSFragment),
	toString:    toDescriptor2(function toString() {
		return this.value.join(``)
	}, true),
	isFragment: toDescriptor2(true, true),
})

/**
 * CSS Block Value
 */
export function CSSBlock() {}

defineClass2(CSSBlock, CSSFragment, {
	constructor: toDescriptor2(CSSBlock),
	toString:    toDescriptor2(function toString() {
		return ``.concat(this.opener, this.value.join(``), this.closer)
	}, true),
	isBlock: toDescriptor2(true, true),
})

/**
 * CSS Function Value
 */
export function CSSFunction() {}

defineClass2(CSSFunction, CSSBlock, {
	constructor: toDescriptor2(CSSFunction),
	toString:    toDescriptor2(function toString() {
		return ``.concat(this.name, this.opener, this.value.join(``), this.closer)
	}, true),
	isFunction: toDescriptor2(true, true),
})

/**
 * CSS Hash Value
 */
export function CSSHash() {}

defineClass2(CSSHash, CSSValue, {
	constructor: toDescriptor2(CSSHash),
	toString:    toDescriptor2(function toString() {
		return ``.concat(this.symbol, this.value)
	}, true),
	isAtWord: toDescriptor2(true, true),
})

/**
 * CSS Number Value
 */
export function CSSNumber() {}

defineClass2(CSSNumber, CSSValue, {
	constructor: toDescriptor2(CSSNumber),
	toString:    toDescriptor2(function toString() {
		return ``.concat(this.value, this.unit)
	}, true),
	isNumber: toDescriptor2(true, true),
})

/**
 * CSS Space Value
 */
export function CSSSpace() {}

defineClass2(CSSSpace, CSSValue, {
	constructor: toDescriptor2(CSSSpace),
	toString:    toDescriptor2(function toString() {
		return this.value
	}, true),
	isNil:   toDescriptor2(true, true),
	isSpace: toDescriptor2(true, true),
})

/**
 * CSS String Value
 */
export function CSSString() {}

defineClass2(CSSString, CSSValue, {
	constructor: toDescriptor2(CSSString),
	toString:    toDescriptor2(function toString() {
		return ``.concat(this.opener, this.value, this.closer)
	}, true),
	isString: toDescriptor2(true, true),
})

/**
 * CSS Word Value
 */
export function CSSWord() {}

defineClass2(CSSWord, CSSValue, {
	constructor: toDescriptor2(CSSWord),
	toString:    toDescriptor2(function toString() {
		return this.value
	}, true),
	isWord: toDescriptor2(true, true),
})

/**
 * CSS Symbol Value
 */
export function CSSSymbol() {}

defineClass2(CSSSymbol, CSSValue, {
	constructor: toDescriptor2(CSSSymbol),
	toString:    toDescriptor2(function toString() {
		return this.value
	}, true),
	isSymbol: toDescriptor2(true, true),
})

/**
 * CSS Declaration
 */
export function CSSDeclaration() {}

defineClass2(CSSDeclaration, CSSValue, {
	constructor: toDescriptor2(CSSDeclaration),
	toString:    toDescriptor2(function toString() {
		const { raw } = this
		return ``.concat(
			raw.name === null ? `` : raw.name,
			raw.betweenNameAndOpener.join(``),
			raw.opener === null ? `` : raw.opener,
			raw.betweenOpenerAndValue.join(``),
			raw.value.join(``),
			raw.betweenValueAndImportant.join(``),
			raw.important.join(``),
			raw.betweenValueAndCloser.join(``),
			raw.closer === null ? `` : raw.closer
		)
	}, true),
	isDeclaration: toDescriptor2(true, true),
})
