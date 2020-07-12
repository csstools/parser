/* Character Codes */
import {
	L_CB,
	L_RB,
	L_SB,
	R_CB,
	R_RB,
	R_SB,
} from './references/code-points.js'

/* Token Identifiers */
import {
	ATWORD_TOKEN,
	COMMENT_TOKEN,
	FUNCTION_TOKEN,
	HASH_TOKEN,
	NUMBER_TOKEN,
	SPACE_TOKEN,
	STRING_TOKEN,
	WORD_TOKEN,
} from './references/token-types.js'

/* CSS Classes */
import {
	CSSAtWord,
	CSSBlock,
	CSSComment,
	CSSFragment,
	CSSFunction,
	CSSHash,
	CSSNumber,
	CSSSpace,
	CSSString,
	CSSSymbol,
	CSSWord,
} from './types.js'

/**
 * Reads CSS tokens and returns a function for consuming nodes from it.
 * @param {import('./tokenize.js').Token} read - Tokens being read as CSS nodes.
 * @return {Object} Consumes a node and returns the current node or null.
 */
function evaluate(read) {
	let ESCAPE

	next.next = next
	next.read = read

	next.parent = next.root = next.node = CSSFragment.create({
		value: next.thread = [],
	})

	return next

	function next() {
		if (read()) {
			const { type } = read

			next.enter = true

			switch (type) {
				/**
				 * Consume an AtWord Node
				 */
				case ATWORD_TOKEN:
					next.thread.push(
						next.node = CSSAtWord.create({
							value:  read.getText(),
							parent: next.parent,
						})
					)

					break

				/**
				 * Consume a Comment Node
				 */
				case COMMENT_TOKEN:
					next.thread.push(
						next.node = CSSComment.create({
							opener: read.getLead(),
							value:  read.getText(),
							closer: read.getTail(),
							parent: next.parent,
						})
					)

					break

				/**
				 * Consume the beginning of a Function Node
				 */
				case FUNCTION_TOKEN:
					next.thread.push(
						next.parent = next.node = CSSFunction.create({
							name:   read.getText(),
							value:  next.thread = [],
							closer: ``,
							parent: next.parent,
						})
					)

					ESCAPE = R_RB

					break

				/**
				 * Consume a Hash Node
				 */
				case HASH_TOKEN:
					next.thread.push(
						next.node = CSSHash.create({
							value:  read.getText(),
							parent: next.parent,
						})
					)

					break

				/**
				 * Consume a Word Node
				 */
				case WORD_TOKEN:
					next.thread.push(
						next.node = CSSWord.create({
							value:  read.getText(),
							parent: next.parent,
						})
					)

					break

				/**
				 * Consume a Number Node
				 */
				case NUMBER_TOKEN:
					next.thread.push(
						next.node = CSSNumber.create({
							value:  read.getText(),
							parent: next.parent,
						})
					)

					break

				/**
				 * Consume a Space Node
				 */
				case SPACE_TOKEN:
					next.thread.push(
						next.node = CSSSpace.create({
							value:  read.getText(),
							parent: next.parent,
						})
					)

					break

				/**
				 * Consume a String Node
				 */
				case STRING_TOKEN:
					next.thread.push(
						next.node = CSSString.create({
							opener: read.getLead(),
							value:  read.getText(),
							closer: read.getTail(),
							parent: next.parent,
						})
					)

					break

				/**
				 * Consume the start of a Block Node
				 */
				case L_RB:
				case L_SB:
				case L_CB:
					next.thread.push(
						next.parent = next.node = CSSBlock.create({
							opener: read.getText(),
							value:  next.thread = [],
							closer: ``,
							parent: next.parent,
						})
					)

					ESCAPE = type === L_RB
						? R_RB
						: type === L_SB
							? R_SB
							: R_CB

					break

				/**
				 * Consume the end of a Block Node or Function Node
				 */
				case ESCAPE:
					next.node = next.parent
					next.node.closer = read.getText()
					next.parent = next.parent.parent
					next.thread = next.parent.value

					ESCAPE = next.parent.opener === `(`
						? R_RB
						: next.parent.opener === `[`
							? R_SB
							: next.parent.opener === `{`
								? R_CB
								: false

					next.enter = false

					break

				/**
				 * Consume a Symbol
				 */
				default:
					next.thread.push(
						next.node = CSSSymbol.create({
							value:  read.getText(),
							parent: next.parent,
						})
					)
			}

			return next
		}

		return null
	}
}

export default evaluate
