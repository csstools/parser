import tokenize from './tokenize.js'
// import declarationFromTokenizer from './types/CSSObject/fromTokenizer/CSSDeclaration.fromTokenizer.js'
// import styleRuleFromTokenizer from './types/CSSObject/fromTokenizer/CSSStyleRule.fromTokenizer.js'
import rootFromTokenizer from './types/CSSObject/fromTokenizer/CSSRoot.fromTokenizer.js'

// const declarationInput = { file: `-`, data: `color: blue` }
// const declarationTokenizer = tokenize(declarationInput)()
// const declarationElement = declarationFromTokenizer(declarationTokenizer)

// console.log(declarationElement.toJSON())

// const styleRuleInput = { file: `-`, data: `html { color: blue; }` }
// const styleRuleTokenizer = tokenize(styleRuleInput)()
// const styleRuleElement = styleRuleFromTokenizer(styleRuleTokenizer)

const testConsumer = rootFromTokenizer
const testText = `html, body {
	@media (width >= 34em) {
		/*1*/color/*2*/:/*3*/ /*4*/34em/*5*/;
	}
}`

const testTokenizer = tokenize({ file: `-`, data: testText })()
const testElement = testConsumer(testTokenizer)

console.log(testElement.toString() === testText)
console.log([ testElement.toString() ])
console.log(testElement.toJSON())
