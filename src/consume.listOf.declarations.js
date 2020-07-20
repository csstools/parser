import { R_CB, SEMI } from './utils/code-points.js'
import { ATWORD_TYPE, WORD_TYPE, COMMENT_TYPE, SPACE_TYPE } from './utils/token-types.js'

import consumeDeclaration from './consume.declaration.js'
import consumeAtRule from './consume.atRule.js'

export default function consumeListOfDeclarations(parser) {
	const parentNode = parser.node.parent
	const declarations = []
	let subparser
	do {
		const { type } = parser
		switch (true) {
			case type === COMMENT_TYPE:
			case type === SPACE_TYPE:
			case type === SEMI:
				declarations.push(parser.node)
				break
			default:
				subparser = subparse()
				while (parser()) {
					switch (parser.type) {
						case SEMI:
						case R_CB:
							if (parser.parent === parentNode) break
							continue
						default:
							if (parser.parent === parentNode) subparser.add(parser.node)
							continue
					}
					break
				}
				while (subparser()) {
					switch (subparser.type) {
						case ATWORD_TYPE:
							declarations.push(consumeAtRule(subparser, consumeListOfDeclarations))
							break
						case WORD_TYPE:
							declarations.push(consumeDeclaration(subparser))
							break
						default:
							do {
								declarations.push(parser.node)
							} while (parser())
							break
					}
				}
		}
	} while (parser())
	while (subparser()) {
		switch (subparser.type) {
			case ATWORD_TYPE:
				declarations.push(consumeAtRule(subparser, consumeListOfDeclarations))
				break
			case WORD_TYPE:
				declarations.push(consumeDeclaration(subparser))
				break
			default:
				do {
					declarations.push(parser.node)
				} while (parser())
				break
		}
	}
	return declarations
}

function consumeDeclarationValue(parser) {
	const list = []
	while (parser()) {
		switch (parser.type) {
			case ATWORD_TYPE:
				list.push(consumeAtRule(parser, consumeListOfDeclarations))
				break
			case WORD_TYPE:
				list.push(consumeDeclaration(parser))
				break
			default:
				do {
					list.push(parser.node)
				} while (parser())
				break
		}
	}
}
function consumeAnythingElseInAListOfDeclarations(parser) {
	const list = []
	do {
		if (parser.type === SEMI) break
		else list.push(parser.node)
	} while (parser())
}

function subparse() {
	const cache = parser.cache = []

	let size = 0

	parser.add = add

	return parser

	function parser() {
		if (size === 0) return false
		size -= 2

		parser.type = cache.shift()
		parser.node = cache.shift()

		return true
	}

	function add(parentParser) {
		size = cache.push(parentParser.type, parentParser.node)
	}
}
