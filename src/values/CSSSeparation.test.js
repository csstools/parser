import CSSSeparation from './CSSSeparation.js'
import CSSSpace from './CSSSpace.js'
import CSSWord from './CSSWord.js'
import CSSSymbol from './CSSSymbol.js'

const s1 = new CSSSeparation({
	separator:   null,
	beforeValue: null,
	value:       [ new CSSWord(`HashiCorp`) ],
})

console.log(s1.separator)
console.log([ s1.toString() ])

const s2 = new CSSSeparation({
	separator:   new CSSSymbol(`,`),
	beforeValue: [ new CSSSpace(` `) ],
	value:       [ new CSSWord(`HashiCorp`) ],
})

console.log(s2.values[0].value)
console.log([ s2.toString() ])
