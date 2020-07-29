import tokenize from './tokenize/tokenize.js'

import {
	CSSAtRule as consumeCSSAtRule,
	CSSDeclaration as consumeCSSDeclaration,
	CSSRule as consumeCSSRule,
	CSSStyleRule as consumeCSSStyleRule,
	CSSStyleSheet as consumeCSSStyleSheet,
	listOfCSSStyleRules as consumelistOfCSSStyleRules,
	listOfCSSStyleRuleValues as consumelistOfCSSStyleRuleValues,
	listOfCSSValues as consumelistOfCSSValues,
	listOfCSSValuesWhile as consumelistOfCSSValuesWhile,
} from './consumers/index.js'

// generic
export const CSSAtRule = createParser(consumeCSSAtRule)
export const CSSRule = createParser(consumeCSSRule)
export const listOfCSSValues = createParser(consumelistOfCSSValues)
export const listOfCSSValuesWhile = createParser(consumelistOfCSSValuesWhile)

// styled
export const CSSDeclaration = createParser(consumeCSSDeclaration)
export const CSSStyleRule = createParser(consumeCSSStyleRule)
export const CSSStyleSheet = createParser(consumeCSSStyleSheet)
export const listOfCSSStyleRules = createParser(consumelistOfCSSStyleRules)
export const listOfCSSStyleRuleValues = createParser(consumelistOfCSSStyleRuleValues)

function createParser(consumer) {
	const doIteration = consumer.prepare

	return function parser(cssText) {
		return consumer(tokenize(cssText, doIteration), null)
	}
}
