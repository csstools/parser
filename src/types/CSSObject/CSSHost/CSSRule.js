import CSSFragment from './CSSFragment.js'
import CSSDeclaration from './CSSDeclaration.js'

export default class CSSRule extends CSSFragment {}

const { prototype } = CSSFragment
const { defineProperty } = Object

defineProperty(prototype, `block`, {
	get: function () {
		return this.nodes.value.length && this.nodes.value[0].nodes.value
	},
	configurable: true,
})

defineProperty(prototype, `declarations`, {
	get: function () {
		return this.nodes.value.length && this.nodes.value[0].nodes.value.filter(
			(value) => (
				value instanceof CSSRule
				|| value instanceof CSSDeclaration
			)
		)
	},
	configurable: true,
})

defineProperty(prototype, `rules`, {
	get: function () {
		return this.nodes.value.length && this.nodes.value[0].nodes.value.filter(
			(value) => (
				value instanceof CSSRule
			)
		)
	},
	configurable: true,
})
