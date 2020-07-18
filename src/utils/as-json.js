const { isArray } = Array
const { keys } = Object

export default function asJSON(value, toJSONFunction, instance) {
	return value === Object(value)
		? isArray(value)
			? value.map((entry) => asJSON(entry, toJSONFunction))
			: (
				typeof value.toJSON === `function`
				&& value.toJSON !== toJSONFunction
			)
				? value.toJSON()
				: keys(value).reduce(
					(propObject, propName) => {
						if (
							propName !== `parent`
							&& propName !== `source`
						) {
							propObject[propName] = asJSON(value[propName], toJSONFunction)
						}

						return propObject
					},
					instance
						? {
							constructor: instance.constructor.name,
						}
						: value.constructor === Object
							? {}
							: {
								constructor: value.constructor.name,
							}
				)
		: value
}
