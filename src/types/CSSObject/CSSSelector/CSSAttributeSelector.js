import CSSSelector from '../CSSSelector.js'

import { assign, defineClass } from '../../../utils/define.js'

export default function CSSAttributeSelector(nodes) {
	assign(this, { nodes })
}

defineClass(
	CSSAttributeSelector,
	CSSSelector,
	{
		isAttributeSelector: [ 6, true ],
		props:               [ 6, [ `opener`, `afterOpener`, `name`, `afterName`, `matcher`, `afterMatcher`, `value`, `afterValue`, `modified`, `afterModifier`, `closer` ] ],
		name:                [ 11, function () {
			return String(this.nodes.opener)
		} ],
		value: [ 11, function () {
			return String(this.nodes.value)
		} ],
	}
)
