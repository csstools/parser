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
	EOT_TYPE,
} from './utils/token-types.js'

/* CSS Values */
import {
	CSSFragment,
	CSSBlock,
	CSSAtWord,
	CSSComment,
	CSSFunction,
	CSSHash,
	CSSNumber,
	CSSSpace,
	CSSString,
	CSSWord,
	CSSSymbol,
} from './CSSValue.js'

/* String fragments */
import {
	emptyString,
	leadOfAtWord,
	leadOfComment,
	leadOfHash,
	leadOfFunction,
} from './utils/strings.js'

import RofL from './utils/variants.js'

/**
 * Reads from CSS text and returns a function for parsing values from it.
 */
export default function parse(tokenizer) {
	let node
	let parentNode = parser.rootNode = new CSSFragment()
	let parentList = []

	parentNode.value = parentList

	let type
	let parentShut
	let wait = 0

	let riseUp

	let isOpen
	let isShut

	function diveIn(currentShut, currentRoot, currentList) {
		// cache
		currentShut = parentShut
		currentRoot = parentNode
		currentList = parentList

		// update
		parentShut = parser.parentShut = RofL[type]
		parentNode = parser.parentNode = node
		parentList = parser.parentList = node.value

		riseUp = function () {
			// restore
			parentShut = parser.parentShut = currentShut
			parentNode = parser.parentNode = currentRoot
			parentList = parser.parentList = currentList
		}
	}

	parser.hold = hold

	return parser

	function hold() {
		++wait

		return false
	}

	function parser() {
		// done
		if (tokenizer() === false) {
			parser.type = parser.code = EOT_TYPE

			return false
		}

		// hold
		if (wait > 0) {
			--wait
			return true
		}

		// reset
		isOpen = false
		isShut = false

		type = parser.type = tokenizer.type

		parser.code = tokenizer.code
		parser.char = tokenizer.char

		switch (type) {
			case ATWORD_TYPE:
				node = new CSSAtWord()
				node.symbol = leadOfAtWord
				node.value = tokenizer.mainText
				break

			case COMMENT_TYPE:
				node = new CSSComment()
				node.opener = leadOfComment
				node.value = tokenizer.mainText
				node.closer = tokenizer.tailText
				break

			case FUNCTION_TYPE:
				node = new CSSFunction()
				node.name = tokenizer.mainText
				node.opener = leadOfFunction
				node.value = []
				node.closer = emptyString
				isOpen = true
				break

			case HASH_TYPE:
				node = new CSSHash()
				node.symbol = leadOfHash
				node.value = tokenizer.mainText
				break

			case NUMBER_TYPE:
				node = new CSSNumber()
				node.value = tokenizer.mainText
				node.unit = tokenizer.tailText
				break

			case SPACE_TYPE:
				node = new CSSSpace()
				node.value = tokenizer.mainText
				break

			case STRING_TYPE:
				node = new CSSString()
				node.opener = tokenizer.leadText
				node.value = tokenizer.mainText
				node.closer = tokenizer.tailText
				break

			case WORD_TYPE:
				node = new CSSWord()
				node.value = tokenizer.mainText
				break

			case L_RB:
			case L_SB:
			case L_CB:
				node = new CSSBlock()
				node.opener = tokenizer.mainText
				node.value = []
				node.closer = emptyString
				isOpen = true
				break

			case R_RB:
			case R_SB:
			case R_CB:
				if (type === parentShut) {
					isShut = true
					break
				}

			default:
				node = new CSSSymbol()
				node.value = tokenizer.mainText
				node.code = tokenizer.code
		}

		node.parent = parentNode
		node.source = { position: tokenizer.position }

		if (isShut === true) {
			riseUp()
		} else {
			parentList.push(node)

			if (isOpen === true) {
				diveIn()
			}
		}

		parser.type = type
		parser.node = node
		parser.open = isOpen
		parser.shut = isShut

		return true
	}
}
