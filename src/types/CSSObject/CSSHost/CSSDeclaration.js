import toString from '../../../utils/toString.js'

import CSSHost from './CSSHost.js'

export default class CSSDeclaration extends CSSHost {
	constructor() {
		super({
			nodes: {
				name:           [],
				afterName:      [],
				opener:         [],
				afterOpener:    [],
				value:          [],
				afterValue:     [],
				important:      [],
				afterImportant: [],
				closer:         [],
			},
		})
	}
}

const { prototype } = CSSDeclaration
const { defineProperty } = Object

defineProperty(prototype, `toJsonTypes`, {
	value: {
		name:           Object,
		afterName:      Object,
		opener:         Object,
		afterOpener:    Object,
		value:          Object,
		afterValue:     Object,
		important:      Object,
		afterImportant: Object,
		closer:         Object,
	},
	configurable: true,
	writable:     true,
})

defineProperty(prototype, `toStringTypes`, {
	value: {
		name:           toString,
		afterName:      toString,
		opener:         toString,
		afterOpener:    toString,
		value:          toString,
		afterValue:     toString,
		important:      toString,
		afterImportant: toString,
		closer:         toString,
	},
	configurable: true,
	writable:     true,
})
