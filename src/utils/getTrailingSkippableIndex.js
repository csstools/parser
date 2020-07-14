/* Token Identifiers */
import CSSComment from '../types/CSSObject/CSSNode/CSSComment.js'
import CSSSpace from '../types/CSSObject/CSSNode/CSSSpace.js'

/**
 * Reconsume whitespace from an array and push it into another array
 * @param {{ code: number, node: unknown }[]} array
 * @param {{ code: number, node: unknown }[]} after
 */
export default function getTrailingSkippableIndex(array) {
	let index = array.length

	while (index >= 1) {
		switch (array[index - 1].constructor) {
			case CSSComment:
			case CSSSpace:
				--index

				continue
		}

		break
	}

	return index
}
