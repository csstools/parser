import tokenize from '../src/tokenize/tokenize.js'
// import fromTokenizer from './types/CSSObject/CSSHost/CSSDeclaration/fromTokenizer.js'
// import blockFromTokenizer from './types/CSSObject/CSSHost/CSSStyleRule/blockFromTokenizer.js'
// import listFromTokenizer from './types/CSSObject/fromTokenizer/Array.fromTokenizer.js'
// import nodeFromTokenizer from './types/CSSObject/fromTokenizer/CSSNode.fromTokenizer.js'
// import declarationFromTokenizer from './types/CSSObject/fromTokenizer/CSSDeclaration.fromTokenizer.js'
// import ruleFromTokenizer from './types/CSSObject/fromTokenizer/CSSStyleRule.fromTokenizer.js'
// import rootFromTokenizer from './types/CSSObject/fromTokenizer/CSSRoot.fromTokenizer.js'
// import consumeAtRuleFromTokenizer from './types/CSSObject/fromTokenizer/CSSAtRule.fromTokenizer.js'
// import consumeStyleRuleFromTokenizer from './types/CSSObject/fromTokenizer/CSSStyleRule.fromTokenizer.js'
import consumeRootFromTokenizer from '../src/types/CSSObject/fromTokenizer/CSSRoot.fromTokenizer.js'

// const cssText = `${`
// html { color: color(awesome, blossom); color: color(awesome, blossom) }
// @media screen { body { color: color(awesome, blossom); color: color(awesome, blossom) } }
// `.trim()}\n`

// const cssText = `@media screen {
// 	@media (width >= 640px) {
// 		html {
// 			color: color(awesome, blossom);
// 			color: color(awesome, blossom)
// 		}
// 	}

// 	body {
// 		color: color(awesome, blossom);
// 		color: color(awesome, blossom)
// 	}
// }`

const cssText = `html {
	color: blue;

	@media (width >= 640px) {
		color: green;
	}
}

@media (width >= 640px) {
	html {
		color: red;
	}
}`

const tokenizer = tokenize({
	// data: `@hello 5em;\nworld("goodbye")`,
	data: cssText,
})

const root = consumeRootFromTokenizer(tokenizer)

// const func = root.nodes.value[2].nodes.value[0].nodes.value[3].nodes.value[0]

// console.log(func.name)

root.items.forEach((value) => {
	if (!value.name) {
		console.log(value.items[0].items[1].items[0].items)
	}
})

console.log([ String(root) ], String(root) === cssText)
