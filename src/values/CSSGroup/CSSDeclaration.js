import { closing, closingType, defineClass, name, opening, openingType, priority, toConcatenatedValues, value, values } from '../CSSValue.utils.js'
import CSSGroup from '../CSSGroup.js'

/**
 *
 * ## CSSDeclaration
 *
 * The CSSDeclaration class is the container of declarations in CSS.
 *
 * @class @extends {CSSGroup}
 */
export default function CSSDeclaration(raw) {
	this.raw = Object(raw)
}

defineClass(`CSSDeclaration`, CSSDeclaration, CSSGroup, {
	/* CSSDeclaration {
		raw: {
			name: CSSWord
			betweenNameAndOpening?: CSSSkippable[]
			opening?: CSSSymbol<":">
			betweenOpeningAndValue?: CSSSkippable[]
			value?: CSSValue[]
			betweenValueAndPriority?: CSSSkippable[]
			priority?: CSSValue
			betweenValueAndClosing?: CSSSkippable[]
			closing?: CSSSymbol<";">
		}
	} */

	// Methods
	toJSON: [ 6, function toJSON() {
		return {
			constructor: this.constructor.name,
			name:        this.name,
			value:       this.value,
			priority:    this.priority,
		}
	} ],
	toValues: [ 6, function toValues() {
		const { raw } = this
		return toConcatenatedValues(
			raw.name,
			raw.betweenNameAndOpening,
			raw.opening,
			raw.betweenOpeningAndValue,
			raw.value,
			raw.betweenValueAndPriority,
			raw.priority,
			raw.betweenValueAndClosing,
			raw.closing
		)
	} ],

	// Accessors
	name:        [ 11, name ],
	priority:    [ 11, priority ],
	opening:     [ 11, opening ],
	openingType: [ 10, openingType ],
	closing:     [ 11, closing ],
	closingType: [ 10, closingType ],
	detail:      [ 11, function () {
		const { raw } = this

		return {
			betweenNameAndOpening:   raw.betweenNameAndOpening,
			betweenOpeningAndValue:  raw.betweenOpeningAndValue,
			betweenValueAndPriority: raw.betweenValueAndPriority,
			betweenValueAndClosing:  raw.betweenValueAndClosing,
		}
	} ],
})

/** @typedef {import("./CSSValue.js")} CSSValue */
