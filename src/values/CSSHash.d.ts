import CSSToken from './CSSToken';

/**
 * ## CSSHash
 *
 * The CSSHash class is the token object for all hashes in CSS.
 */
export default class CSSHash extends CSSToken {
	constructor(value?: string, isWithoutClosing?: boolean) {}

	isCSSHash: true
	symbol: "#"
	value: string
}
