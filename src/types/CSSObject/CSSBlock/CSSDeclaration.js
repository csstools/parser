import CSSBlock from '../CSSBlock.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSDeclaration(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSDeclaration,
	CSSBlock,
	{
		props: [ 6, [ `name`, `afterName`, `opener`, `afterOpener`, `value`, `afterValue`, `important`, `afterImportant`, `closer` ] ],
		name:  [ 11, function () {
			return this.nodes.name.value
		} ],
		opener: [ 11, function () {
			return String(this.nodes.opener)
		} ],
		important: [ 11, function () {
			return String(this.nodes.important)
		} ],
		closer: [ 11, function () {
			return String(this.nodes.closer)
		} ],
	}
)
