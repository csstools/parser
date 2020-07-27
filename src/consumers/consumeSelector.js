import { COLA, HASH, STOP, STAR } from '../utils/code-points.js'
import { WORD_TYPE } from '../utils/token-types.js'
import { withParent } from './consume.utils.js'
import CSSSelector from '../values/CSSSelector.js'

/**
 * Consume a selector from an prepared iterator.
 */
export default function consumeSelector(iterator, parent) {
	const value = []
	const element = withParent(new CSSSelector({
		selector: `complex`,
		value,
	}), parent)

	let iv0
	let iv1

	do {
		iv0 = iterator.value

		switch (iterator.type) {
			// pseudo-class
			// pseudo-element
			case COLA:
				if (iterator() === true) {
					iv1 = iterator.value
					switch (true) {
						// pseudo-element
						case iterator.type === COLA:
							if (iterator() === true) {
								if (
									iterator.type === WORD_TYPE
									|| iterator.isCSSFunction === true
								) {
									value.push(
										new CSSSelector({
											selector: `pseudo-element`,
											symbol:   [ iv0, iv1 ],
											value:    iterator.value,
										})
									)
								} else {
									// otherwise, toss iv0, redo iv1 as iv0
									iterator.redo()
								}
							} else {
								// otherwise, toss iv0, redo iv1
								iterator.redo()
							}
							break
						// pseudo-class
						case (
							iterator.type === WORD_TYPE
							|| iv1.isCSSFunction === true
						):
							value.push(
								new CSSSelector({
									selector: `pseudo-class`,
									symbol:   iv0,
									value:    iv1,
								})
							)
							break
						// unknown
						default:
							// toss iv0, redo iv1
							iterator.redo()
							value.push(
								new CSSSelector({
									selector: `unknown-1`,
									value:    iv0,
								})
							)
					}
				} else {
					value.push(
						new CSSSelector({
							selector: `unknown-2`,
							value:    iv0,
						})
					)
				}
				break
			// universal
			case STAR:
				value.push(
					new CSSSelector({
						selector: `universal`,
						value:    iv0,
					})
				)
				break
			// class
			case STOP:
				value.push(
					consumeClassOrId(`class`)
				)
				break
			// id
			case HASH:
				value.push(
					consumeClassOrId(`id`)
				)
				break
			// type
			case WORD_TYPE:
				value.push(
					new CSSSelector({
						selector: `type`,
						value:    iterator.value,
					})
				)
				break
			// unknown
			default:
				value.push(
					new CSSSelector({
						selector: `unknown-3`,
						value:    iterator.value,
					})
				)
				break
		}
	} while (iterator() === true)

	return element

	function consumeClassOrId(type) {
		iv0 = iterator.value
		if (iterator() === true) {
			if (iterator.type === WORD_TYPE) {
				return new CSSSelector({
					selector: type,
					symbol:   iv0,
					value:    iterator.value,
				})
			}

			iterator.redo()

			return new CSSSelector({
				selector: `unknown-4`,
				value:    iv0,
			})
		}

		return new CSSSelector({
			selector: `unknown-5`,
			value:    iv0,
		})
	}
}

consumeSelector.prepare = true
