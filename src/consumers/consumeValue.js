import { FUNCTION_TYPE } from '../utils/token-types.js'
import { L_CB, L_RB, L_SB } from '../utils/code-points.js'
import { withParent } from './consume.utils.js'
import consumeBlock from './consumeBlock.js'
import CSSBlock from '../values/CSSGroup/CSSBlock.js'
import CSSFunction from '../values/CSSGroup/CSSFunction.js'

/**
 * Consume a value from a prepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} [parent]
 */
export default function consumeValue(iterator, parent) {
	switch (iterator.type) {
		case L_CB:
		case L_SB:
		case L_RB:
			return consumeBlock(
				iterator,
				withParent(
					new CSSBlock({ opening: null, value: null, closing: null }),
					parent
				)
			)

		case FUNCTION_TYPE:
			return consumeBlock(
				iterator,
				withParent(
					new CSSFunction({ opening: null, value: null, closing: null }),
					parent
				)
			)

		default:
			return withParent(
				iterator.value,
				parent
			)
	}
}

consumeValue.prepare = true

/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
/** @typedef {import('../css-objects.js').Iterator} Iterator */
