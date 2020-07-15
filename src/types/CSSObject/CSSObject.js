const { isArray } = Array
const { assign, defineProperties, keys } = Object

export default class CSSObject {
	constructor(init) {
		assign(this, init)
	}
}

defineProperties(CSSObject.prototype, {
	toJSON: {
		value:        toJSON,
		configurable: true,
		writable:     true,
	},
	toString: {
		value:        toString,
		configurable: true,
		writable:     true,
	},
})

function toJSON() {
	return asJSON(this, toJSON)
}

export function asJSON(value, toJSONFunction) {
	return value === Object(value)
		? isArray(value)
			? value.map(asJSON)
			: (
				typeof value.toJSON === `function`
				&& value.toJSON !== toJSONFunction
			)
				? value.toJSON()
				: (
					keys(value)
				).reduce(
					(propObject, propName) => {
						propObject[propName] = asJSON(value[propName])

						return propObject
					},
					{}
				)
		: value
}

function toString() {
	return asString(this, this.props)
}

export function asString(object, props) {
	const buffer = []

	props.forEach((name) => {
		const value = object[name]
		if (isArray(value)) buffer.push(...value)
		else if (value != null) buffer.push(value)
	})

	return buffer.join(``)
}
