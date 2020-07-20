import {
	L_CB,
	R_CB,
} from './utils/code-points.js'
import consumeListOfDeclarations from './consume.listOf.declarations.js'

export default function consumeRule(parser) {
	const component = {
		prelude: [],
		opener:  null,
		value:   [],
		closer:  null,
	}
	// prelude
	component.prelude = consumePrelude(parser)
	// opener
	if (parser.type === L_CB) {
		component.opener = `{`
		// value
		parser()
		component.value = consumeListOfDeclarations(parser)
		// closer
		if (parser.type === R_CB) {
			component.closer = `}`
		}
		// next
		parser()
	}
	return component
}

function consumePrelude(parser) {
	const { parent } = parser.node
	const prelude = []
	do {
		if (
			parser.type === L_CB
			&& parser.node.parent === parent
		) break
		else prelude.push(parser.node)
	} while (parser())
	return prelude
}
