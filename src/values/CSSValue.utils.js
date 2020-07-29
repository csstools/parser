const { create, defineProperties } = Object
const { isArray } = Array
const { reduce } = Array.prototype

export { isArray }

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
	return toConcatenatedValues.apply(this, arguments).join(``)
}

/**
 * Returns a concatenated string from the values of a CSSGroup.
 * @returns {string}
 */
export function toString() {
	return this.toValues().join(``)
}

/**
 * Returns a concatenated string from arguments that may be CSSValues or arrays of CSSValues.
 * @argument {...(void | CSSValue | CSSValue[])} ...args
 * @returns {CSSValue[]}
 */
export function toConcatenatedValues() {
	return reduce.call(arguments, (array, value) => {
		if (isArray(value)) array.push(...value)
		else if (value != null) array.push(value)

		return array
	}, [])
}

/**
 * Return a value as a JSON-compatible object.
 */
export function toJSONObject(value) {
	return value == null
		? null
		: isArray(value)
			? value.map(toJSONObject)
			: typeof Object(value).toJSON === `function`
				? value.toJSON()
				: value
}

export function toSymbolString(node) {
	return Object(node).symbol == null ? null : String(node.symbol)
}

/**
 * Returns the string value of the object’s value.
 * @param {CSSToken} node
 */
export function toValueString(node) {
	return Object(node).value == null ? null : String(node.value)
}

/**
 * Returns the string value of the object’s raw name.
 * @param {CSSToken} node
 */
export function name() {
	return this.raw.name
}

/**
 * Returns a string value of the object’s raw separator.
 * @this {{ raw: { separator: CSSToken }}}
 */
export function separator() {
	return toConcatenatedString(this.raw.separator)
}

/**
 * Returns a string value of the object’s raw value.
 * @this {{ raw: { separator: CSSToken }}}
 */
export function value() {
	return toConcatenatedString(this.raw.value)
}

/**
 * Return the array of values from the group, otherwise an empty array.
 * @this {CSSGroup}
 * @returns {CSSValue[]}
 */
export function values() {
	const { value } = this.raw

	return isArray(value) ? value : []
}

/**
 * Returns a string value of the object’s raw priority.
 * @this {{ raw: { priority: CSSPriority }}}
 */
export function priority() {
	return this.raw.priority
}

/**
 * Returns a string value of the object’s raw opening.
 * @this {{ raw: { opening: CSSSymbol }}}
 */
export function opening() {
	return this.raw.opening
}

/**
 * Returns a starting character code of the object’s opening.
 * @this {{ opening: string }}
 */
export function openingType() {
	return this.raw.opening.value.charCodeAt(0)
}

/**
 * Returns a starting character code of the object’s value.
 * @this {CSSToken}
 */
export function valueType() {
	return this.value.charCodeAt(0)
}

/**
 * Returns a string value of the object’s raw closing.
 * @this {{ raw: { closing: CSSSymbol }}}
 */
export function closing() {
	return this.raw.closing
}

/**
 * Returns a starting character code of the object’s closing.
 * @this {{ closing: string }}
 */
export function closingType() {
	return this.raw.closing.value.charCodeAt(0)
}

/**
 * Returns the values of the object’s raw prelude.
 * @this {{ raw: { prelude: CSSValue[] } }}
 */
export function prelude() {
	return isArray(this.raw.prelude) ? this.raw.prelude : []
}

export function source() {
	const values = this.toValues()

	if (values.length) return values[0].source

	return null
}

/** @typedef {import('../values').CSSBlock<{ opening: CSSToken, value: CSSValue[], closing: CSSToken }>} CSSBlock */
/** @typedef {import('../values').CSSGroup<{ value: CSSToken }>} CSSGroup */
/** @typedef {import('../values').CSSPriority<{ symbol: CSSSymbol, value: CSSWord }>} CSSPriority */
/** @typedef {import('../values').CSSSymbol<string>} CSSSymbol */
/** @typedef {import('../values').CSSToken<string>} CSSToken */
/** @typedef {import('../values').CSSValue} CSSValue */
/** @typedef {import('../values').CSSWord<string>} CSSWord */
