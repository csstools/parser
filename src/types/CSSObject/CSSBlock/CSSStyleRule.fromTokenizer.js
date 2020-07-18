// utilities
import { L_CB, STOP, HASH, COLA, STAR, COMA, L_SB } from '../../../utils/code-points.js'
import { WORD_TYPE, SPACE_TYPE, COMMENT_TYPE, STRING_TYPE } from '../../../utils/token-types.js'
import getTrailingSkippableIndex from '../../../utils/get-trailing-skippable-index.js'

import consumeKnownCSSBracketBlock from '../../../utils/consume-known-css-bracket-block.js'
import consumeCSSBlockValue from '../CSSBlock.valueFromTokenizer.js'
import consumeCSSStyleRule from './CSSStyleRule.valueFromTokenizer.js'

// selector classes
import CSSAttributeSelector from '../CSSSelector/CSSAttributeSelector.js'
import CSSClassSelector from '../CSSSelector/CSSClassSelector.js'
import CSSIdSelector from '../CSSSelector/CSSIdSelector.js'
import CSSPseudoSelector from '../CSSSelector/CSSPseudoSelector.js'
import CSSSelector from '../CSSSelector.js'
import CSSComplexSelector from '../CSSSelector/CSSComplexSelector.js'
import CSSUniversalSelector from '../CSSSelector/CSSUniversalSelector.js'

// main class
import CSSStyleRule from './CSSStyleRule.js'
import CSSSymbolToken from '../CSSToken/CSSSymbolToken.js'
import CSSCombinator from '../CSSSelector/CSSCombinator.js'
import consumeLeadingWhitespace from '../../../utils/consume-leading-skippables.js'

/**
 * Consume a style rule
 * @see https://drafts.csswg.org/css-syntax/#consume-a-qualified-rule
 */
export default function fromTokenizer(tokenizer) {
	// create an empty declaration
	const prelude = []
	const afterPrelude = []
	const value   = []
	const block = new CSSStyleRule({
		prelude,
		afterPrelude,
		opener: null,
		value,
		closer: null,
	})

	let token

	do {
		switch (tokenizer.type) {
			// <{-token>
			case L_CB:
				afterPrelude.push(...prelude.splice(getTrailingSkippableIndex(prelude)))

				consumeSelectors(prelude, block)

				// consume a simple block and assign it to the style rule’s block
				consumeKnownCSSBracketBlock(tokenizer, consumeCSSStyleRule, block)

				break

			// anything else
			default:
				// consume a component value
				// append the returned value to the style rule’s prelude.
				prelude.push(token = consumeCSSBlockValue(tokenizer))
				token.parent = block

				continue
		}

		break
	} while (tokenizer())

	// return the style rule
	return block
}

function consumeSelectors(tokens, parent) {
	let thisToken
	let nextToken
	let n3rdToken
	let selector
	let selectorTokens = []
	let complexSelector = new CSSComplexSelector({ value: selectorTokens })
	complexSelector.parent = parent
	const selectorList = []

	for (let i = 0, l = tokens.length; i < l; ++i) {
		thisToken = tokens[i]
		nextToken = tokens[i + 1] || {}
		n3rdToken = tokens[i + 2] || {}

		switch (true) {
			// <universal-selector>
			case (
				thisToken.type === STAR
			):
				selector = new CSSUniversalSelector({ value: thisToken })
				selector.parent = complexSelector

				break

			// <separator>
			case (
				thisToken.type === COMA
			):
				// ...
				selectorList.push(...selectorTokens.splice(getTrailingSkippableIndex(selectorTokens)))
				selectorList.push(complexSelector)
				selectorList.push(thisToken)
				// ...
				complexSelector = new CSSComplexSelector({ value: selectorTokens = [] })
				complexSelector.parent = parent
				// ...
				i = consumeSkippableTokens(tokens, i, selectorList, parent)

				break

			// <tag-selector>
			case (
				thisToken.isWordToken
			):
				selector = new CSSSelector({ value: thisToken })
				selector.parent = complexSelector

				break

			// <class-selector>
			case (
				thisToken.type === STOP
				&& nextToken.isWordToken
				&& ++i
				&& true
			):
				selector = new CSSClassSelector({ symbol: thisToken, value: nextToken })
				selector.parent = complexSelector

				break

			// <id-selector>
			case (
				thisToken.type === HASH
				&& nextToken.isWordToken
				&& ++i
				&& true
			):
				selector = new CSSIdSelector({ symbol: thisToken, value: nextToken })
				selector.parent = complexSelector

				break

			// <pseudo-element-selector>
			case (
				thisToken.type === COLA
				&& nextToken.type === COLA
				&& (
					n3rdToken.isWordToken
					|| n3rdToken.isFunction
				)
				&& ++i
				&& ++i
				&& true
			):
				selector = new CSSPseudoSelector({ symbol: [ thisToken, nextToken ], value: n3rdToken })
				selector.parent = complexSelector

				break

			// <pseudo-class-selector>
			case (
				thisToken.type === COLA
				&& (
					nextToken.isWordToken
					|| nextToken.isFunction
				)
				&& ++i
				&& true
			):
				selector = new CSSPseudoSelector({ symbol: [ thisToken ], value: nextToken })
				selector.parent = complexSelector

				break

			// <attribute-selector>
			case (
				thisToken.isBracketBlock
				&& thisToken.nodes.opener.type === L_SB
			):
				selector = consumeCSSAttributeSelectors(thisToken)
				selector.parent = complexSelector

				break

			// <combinator>
			case (
				thisToken.isSpaceToken
				|| (
					thisToken.isSymbolToken
					&& (
						thisToken.value === `>`
						|| thisToken.value === `+`
						|| thisToken.value === `~`
						|| thisToken.value === `|`
					)
				)
			):
				selector = new CSSCombinator({ value: [ thisToken ] })
				selector.parent = complexSelector

				while (i + 1 < l) {
					nextToken = tokens[i + 1]

					if (
						nextToken.isSpaceToken
						|| (
							nextToken.isSymbolToken
							&& (
								nextToken.value === `>`
								|| nextToken.value === `+`
								|| nextToken.value === `~`
								|| nextToken.value === `|`
							)
						)
					) {
						selector.nodes.value.push(nextToken)
						nextToken.parent = selector

						++i
					} else {
						break
					}
				}

				break

			// <unknown-selector>
			default:
				selector = thisToken
		}

		selectorTokens.push(selector)
	}

	if (selectorTokens.length) {
		complexSelector = new CSSComplexSelector({ value: selectorTokens })
		complexSelector.parent = parent
		selectorList.push(complexSelector)
	}

	tokens.splice(0, tokens.length, ...selectorList)
}

function consumeCSSAttributeSelectors(block) {
	const afterOpener   = []
	const afterName     = []
	const afterValue    = []
	const matcher       = []
	const afterModifier = []

	const selector = new CSSAttributeSelector({
		opener:   block.nodes.opener,
		afterOpener,
		matcher,
		value:    null,
		afterValue,
		modifier: null,
		afterModifier,
		closer:   block.nodes.closer,
	})
	selector.nodes.opener.parent = selector
	selector.nodes.closer.parent = selector

	const { value: tokens } = block.nodes
	const size              = tokens.length

	let index = consumeSkippableTokens(tokens, -1, afterOpener, selector) + 1
	let token = tokens[index]

	if (
		token.type === WORD_TYPE
	) {
		selector.nodes.name = token
		token.parent = selector
	}

	// after name, before matcher
	index = consumeSkippableTokens(tokens, index, afterName, selector) + 1
	token = tokens[index]

	while (
		index < size
		&& (
			token.type === COMMENT_TYPE
			|| token.constructor === CSSSymbolToken
		)
	) {
		matcher.push(token)
		token.parent = selector

		token = tokens[++index]
	}

	if (index >= size) return selector

	if (
		token.type === WORD_TYPE
		|| token.type === STRING_TYPE
	) {
		selector.nodes.value = token
		token.parent = selector
	}

	index = consumeSkippableTokens(tokens, index, afterValue, selector) + 1
	token = tokens[index]

	if (index >= size) return selector

	if (
		token.type === WORD_TYPE
		|| token.type === STRING_TYPE
	) selector.modifier = token

	while (++index < size) {
		afterModifier.push(token = tokens[index])
		token.parent = selector
	}

	return selector
}

function consumeSkippableTokens(tokens, index, array, parent) {
	while (index + 1 < tokens.length) {
		const token = tokens[index + 1].type

		if (
			token.type === COMMENT_TYPE
			|| token.type === SPACE_TYPE
		) {
			array.push(token)
			token.parent = parent

			++index
		} else break
	}

	return index
}
