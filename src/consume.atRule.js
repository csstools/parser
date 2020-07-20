import {
	L_CB,
	R_CB,
} from './utils/code-points.js'
import { ATWORD_TYPE } from './utils/token-types.js'
import { CSSValue } from './CSSValue.js'

export default function consumeAtRule(parser, consumer) {
	if (parser.type !== ATWORD_TYPE) return parser.node
	const element = new CSSValue()
	const raw = element.raw = {}
	raw.name = parser.node
	raw.prelude = []
	raw.opener = ``
	raw.value = []
	raw.closer = ``

	// prelude
	raw.prelude = consumePrelude(parser)

	// opener
	if (parser.type === L_CB) {
		raw.opener = `{`
		parser()

		// value
		raw.value = consumer(parser)

		// closer
		if (parser.type === R_CB) {
			raw.closer = `}`
			parser()
		}
	}

	return element
}

function consumePrelude(parser) {
	const parentNode = parser.node.parent
	const prelude = []
	do {
		if (
			parser.type === L_CB
			&& parser.node.parent === parentNode
		) break
		else prelude.push(parser.node)
	} while (parser())
	return prelude
}
