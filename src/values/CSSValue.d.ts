import CSSGroup from './CSSGroup'

/**
 * ## CSSValue
 *
 * The CSSValue class is the foundational class that all other CSS objects extend from.
 */
export default interface CSSValue extends Object {
	isCSSValue: true
	value: string
	parent: CSSGroup
}
