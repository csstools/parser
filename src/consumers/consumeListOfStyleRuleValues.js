import { ATWORD_TYPE, COMMENT_TYPE, SPACE_TYPE, WORD_TYPE } from '../utils/token-types.js'
import { SEMI, AMPS } from '../utils/code-points.js'
import { createIterator, withParent, isIteratingNonSemis } from './consume.utils.js'
import consumeDeclaration from './consumeDeclaration.js'
import consumeListOfValuesWhile from './consumeListOfValuesWhile.js'
import consumeAtRule from './consumeAtRule.js'
import consumeRule from './consumeRule.js'

/**
 * Consume a list of style rule values from an unprepared iterator.
 *
 * @argument {Iterator} iterator
 * @argument {CSSGroup} [parent]
 * @argument {Consumer} [consumerOfListOfAtRuleValue]
 * @argument {Consumer} [consumerOfListOfRuleValue]
 * @argument {Consumer} [consumerOfListOfAtRulePrelude]
 * @argument {Consumer} [consumerOfListOfRulePrelude]
 */
export default function consumeListOfStyleRuleValues(iterator, parent) {
	const listOfDeclarations = []

	let declaration

	while (iterator() === true) {
		switch (iterator.type) {
			case COMMENT_TYPE:
			case SPACE_TYPE:
			case SEMI:
				listOfDeclarations.push(withParent(iterator.value, parent))

				break

			case ATWORD_TYPE:
				listOfDeclarations.push(
					consumeAtRule(
						iterator,
						parent,
						consumeListOfStyleRuleValues
					)
				)
				break

			case WORD_TYPE:
				iterator.redo()

				declaration = consumeDeclaration(
					createIterator(
						consumeListOfValuesWhile(iterator, parent, isIteratingNonSemis),
						true
					),
					parent
				)

				if (iterator.type === SEMI) {
					declaration.raw.closing = withParent(iterator.value, declaration)
				}

				listOfDeclarations.push(declaration)

				break

			case AMPS:
				listOfDeclarations.push(
					consumeRule(
						iterator,
						parent,
						consumeListOfStyleRuleValues
					)
				)

				break

			default:
				// iterator.redo()

				// if (iterator.value.isCSSToken) {
				// 	listOfDeclarations.push(
				// 		...consumeListOfValuesWhile(iterator, parent, isIteratingNonSemis)
				// 	)
				// }

				// listOfDeclarations.push(iterator.value)
		}
	}

	return listOfDeclarations
}

/** @typedef {import('../values/index.js').CSSBlock} CSSBlock */
/** @typedef {import('../css-objects.js').Iterator} Iterator */
