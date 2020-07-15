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

// console.log(styleRuleElement.toJSON())

const rootInput = { file: `-`, data: `html { @media screen { color: color(--blue); } }` }
const rootTokenizer = tokenize(rootInput)()
const rootElement = rootFromTokenizer(rootTokenizer)

// console.log(rootElement)
// console.log(rootElement.toJSON())
console.log([ rootElement.toString() ])
