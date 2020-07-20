import { COMMENT_TYPE, SPACE_TYPE, ATWORD_TYPE } from './utils/token-types.js'

import consumeRule from './consume.rule.js'
import consumeAtRule from './consume.atRule.js'

/**
 * Consume a list of rules.
 * @param {*} parser
 * @see https://drafts.csswg.org/css-syntax/#consume-list-of-rules
 */
export default function consumeListOfRules(parser) {
	const list = []
	switch (parser.type) {
		// <comment-token> | <whitespace-token>
		case COMMENT_TYPE:
		case SPACE_TYPE:
			list.push(parser.node)
			break
		// <at-keyword-token>
		case ATWORD_TYPE:
			list.push(consumeAtRule(parser))
			break
		// anything else
		default:
			list.push(consumeRule(parser))
	}
	return list
}
