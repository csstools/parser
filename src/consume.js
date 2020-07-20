import {
	CSSDeclaration,
} from './CSSValue.js'

export function consumeValue(parser) {
	while (parser() === true) continue

	return parser.root
}

export function consumeAsDeclarationList(values) {
	const l = values.length
	const list = []

	let i
	let ii
	let value
	let element

	for (i = 0; i < l; ++i) {
		value = values[i]

		switch (true) {
			// CSSSpace / CSSComment
			case value.isSpace === true:
			case value.isComment === true:
				list.push(value)
				break

			// CSSWord
			case value.isWord === true:
				for (ii = i; ii < l; ++ii) {
					value = values[ii]
					if (value.value === `;`) break
				}
				element = consumeAsDeclaration(values.slice(i, ii))
				i = ii
				if (
					i < l
					&& values[i].value === `;`
				) element.closer = values[i]
				list.push(element)
				break

			// CSSAtWord
			case value.isAtWord === true:

			// Anything Else...
			default:
				for (ii = i; ii < l; ++ii) {
					value = values[ii]
					if (value.value === `;`) break
				}
				list.push(...values.slice(i, ii))
				break
		}
	}

	return list
}

export function consumeAsDeclaration(values) {
	const element = new CSSDeclaration()
	element.name = null
	element.afterName = []
	element.opener = null
	element.afterOpener = []
	element.value = []
	element.afterValue = []
	element.closer = null

	const l = values.length
	let i = 0
	let value

	// next
	if (i < l) value = values[i]
	else return element

	// declaration name
	if (value.isWord) element.name = value
	else return element

	// comments and spaces after name
	i = consumeOpeningSkippables(values, element.afterName, ++i, l)

	// next
	if (i < l) value = values[i]
	else return element

	// declaration opener
	if (value.value === `:`) element.opener = value
	else return element

	// comments and spaces after opener
	i = consumeOpeningSkippables(values, element.afterOpener, ++i, l)

	// declaration value
	for (; i < l; ++i) element.value.push(values[i])

	// comments and spaces after value
	reclaimClosingSkippables(element.value, element.afterValue)

	return element
}

function consumeAsRuleList(values) {
	const l = values.length
	const list = []

	let i
	let ii
	let value
	let element

	for (i = 0; i < l; ++i) {
		value = values[i]

		switch (true) {
			case value.isSpace === true:
			case value.isComment === true:
				list.push(value)
				break
			default:
				for (ii = i; ii < l; ++ii) {
					value = values[ii]
					if (
						value.isBlock === true
						&& value.opener === `{`
					) break
				}
				element = consumeAsPrelude(values.slice(i, ii))
				i = ii
				if (
					i < l
					&& values[i].value === `;`
				) element.closer = values[i]
				list.push(element)
				break
		}
	}

	return list
}

function consumeOpeningSkippables(source, target, s, l) {
	let i = s
	let value
	for (; i < l; ++i) {
		value = source[i]
		if (
			value.isSpace === true
			|| value.isComment === true
		) continue
		else break
	}
	if (i !== s) target.push(...source.slice(s, i))
	return i
}

function reclaimClosingSkippables(source, target) {
	let i = source.length
	let value
	for (; i > 1; --i) {
		value = source[i - 1]
		if (
			value.isSpace === true
			|| value.isComment === true
		) continue
		else break
	}
	target.push(...source.splice(i))
}
