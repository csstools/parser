const { create, defineProperties } = Object

/**
 * Assigns a parent class and prototype descriptors to the target class.
 * @argument {string} name - Name of the class.
 * @argument {C} Class - Target class.
 * @argument {FunctionConstructor} Super - Parent class.
 * @argument {{ [s: string]: [number, any] } & ThisType<C>} descriptors - Prototype descriptors.
 * @template {FunctionConstructor} C
 * @returns {C}
 * @example <caption>Bitmask | Enumerable | Configurable | Writable | Accessor</caption>
 * |  #  | E | C | W | A |
 * | --- | - | - | - | - |
 * | 0x0 |   |   |   |   |
 * | 0x1 | E |   |   |   |
 * | 0x2 |   | C |   |   |
 * | 0x3 | E | C |   |   |
 * | 0x4 |   |   | W |   |
 * | 0x5 | E |   | W |   |
 * | 0x6 |   | C | W |   |
 * | 0x7 | E | C | W |   |
 * | 0x8 |   |   |   | A |
 * | 0x9 | E |   |   | A |
 * | 0xA |   | C |   | A |
 * | 0xB | E | C |   | A |
 */
export function defineClass(name, Class, Super, descriptors) {
	return defineProperties(
		Class,
		toDescriptors(
			{
				name:      [ 2, name ],
				prototype: [ 0, create(
					(Class.__proto__ = Super).prototype,
					toDescriptors({
						constructor:   [ 6, Class ],
						[`is${name}`]: [ 2, true ],
						...descriptors,
					})
				) ],
			}
		)
	)
}

function toDescriptors(props) {
	const descriptors = {}

	for (const name in props) {
		descriptors[name] = toDescriptor(...props[name])
	}

	return descriptors
}

/**
 * Returns a descriptor for an object.
 * @argument {B} bitmask - Bitmask to determine whether the property may be reconfigured or deleted, show up during enumeration, and change with an assignment.
 * @argument {G} getter - Value associated with the property, or the function to serve as the getter for the property.
 * @argument {S} [setter] - Function to serve as the setter for the property.
 * @template {number} B @template {any | Function} G @template {Function} S
 * @returns {{ configurable: boolean, enumerable: boolean, writable?: boolean, get?: G, set?: S, value?: G }}
 * @example
 * | bitmask | enumerable | configurable | writable | accessor |
 * | ------- | ---------- | ------------ | -------- | -------- |
 * |       0 |            |              |          |          |
 * |       1 |     ■      |              |          |          |
 * |       2 |            |      ■       |          |          |
 * |       3 |     ■      |      ■       |          |          |
 * |       4 |            |              |    ■     |          |
 * |       5 |     ■      |              |    ■     |          |
 * |       6 |            |      ■       |    ■     |          |
 * |       7 |     ■      |      ■       |    ■     |          |
 * |       8 |            |              |          |    ■     |
 * |       9 |     ■      |              |          |    ■     |
 * |      10 |            |      ■       |          |    ■     |
 * |      11 |     ■      |      ■       |          |    ■     |
 */
function toDescriptor(bitmask, getter, setter) {
	/** @type {{ configurable: boolean, enumerable: boolean, writable?: boolean, get?: G, set?: S, value?: G }} */
	const descriptor = {
		configurable: bitmask & 2,
		enumerable:   bitmask & 1,
	}

	if (bitmask & 4) {
		descriptor.writable = true
	}

	if (bitmask & 8) {
		descriptor.get = getter
		descriptor.set = setter
	} else {
		descriptor.value = getter
	}

	return descriptor
}

/**
 * Returns a concatenated string from arguments that may be CSSValues or arrays of CSSValues.
 * @argument {...(void | CSSValue | CSSValue[])} ...args
 * @returns {string}
 */
export function toConcatenatedString() {
	return Array.prototype.reduce.call(arguments, (array, value) => {
		if (Array.isArray(value)) array.push(...value)
		else if (value != null) array.push(value)

		return array
	}, []).join(``)
}

/**
 * Returns a concatenated string from arguments that may be CSSValues or arrays of CSSValues.
 * @argument {...(void | CSSValue | CSSValue[])} ...args
 * @returns {CSSValue[]}
 */
export function toConcatenatedValues() {
	return Array.prototype.reduce.call(arguments, (array, value) => {
		array.push(...getConcatenatedValue(value))

		return array
	}, [])

	function getConcatenatedValue(value) {
		return value == null
			? []
			: Array.isArray(value)
				? value.map(toConcatenatedValues)
				: typeof Object(value).toValues === `function`
					? value.toValues()
					: [ value ]
	}
}

/** Return a value as a JSON-compatible object. */
export function toJSONObject(value) {
	return value == null
		? null
		: Array.isArray(value)
			? value.map(toJSONObject)
			: typeof Object(value).toJSON === `function`
				? value.toJSON()
				: value
}

export function toSymbolString(node) {
	return Object(node).symbol == null ? null : String(node.symbol)
}

export function toValueString(node) {
	return Object(node).value == null ? null : String(node.value)
}
