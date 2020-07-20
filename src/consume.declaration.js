import { CSSDeclaration } from './CSSValue.js'
import { WORD_TYPE, COMMENT_TYPE, SPACE_TYPE, EOT_TYPE } from './utils/token-types.js'
import { COLA, SEMI, BANG } from './utils/code-points.js'

export default function consumeDeclaration(parser) {
	if (parser.type !== WORD_TYPE) return parser.node

	const { parent } = parser.node
	const declaration = new CSSDeclaration()
	const raw = declaration.raw = {}
	raw.name = parser.node
	raw.betweenNameAndOpener = []
	raw.opener = null
	raw.betweenOpenerAndValue = []
	const value = raw.value = []
	raw.betweenValueAndImportant = []
	raw.important = []
	raw.betweenValueAndCloser = []
	raw.closer = null

	if (parser()) consumeNil(parser, raw.betweenNameAndOpener)
	else return declaration

	if (parser.type === COLA) raw.opener = parser.node
	else return declaration

	if (parser()) consumeNil(parser, raw.betweenOpenerAndValue)
	else return declaration

	if (parser.type === EOT_TYPE) return declaration

	do {
		if (parser.type === SEMI) {
			if (parent === parser.node.parent) {
				raw.closer = parser.node
				reclaimNil(value, raw.betweenValueAndCloser)
				reclaimImportant(value, raw.important)
				reclaimNil(value, raw.betweenValueAndImportant)
				parser()
				break
			}
		}

		value.push(parser.node)
	} while (parser())

	return declaration
}

function consumeNil(parser, target) {
	do {
		if (
			parser.type === COMMENT_TYPE
			|| parser.type === SPACE_TYPE
		) target.push(parser.node)
		else break
	} while (parser())
}

function reclaimNil(source, target) {
	let i = source.length
	for (; i > 1; --i) {
		if (source[i - 1].isNil === true) continue
		else break
	}
	target.push(...source.splice(i))
}

function reclaimImportant(source, target) {
	let i = source.length - 1
	const isPossiblyImportant = (
		i in source
		&& source[i].isWord
		&& /^important$/i.test(source[i].value)
	)
	if (isPossiblyImportant) {
		while (--i >= 0) {
			if (source[i].isNil === true) continue
			break
		}
		const isImportant = source[i].code === BANG
		if (isImportant) target.push(...source.splice(i))
	}
}
