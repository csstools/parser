const { isArray } = Array
const { keys } = Object

export default function toJSON() {
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
