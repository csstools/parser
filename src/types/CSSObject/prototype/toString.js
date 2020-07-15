const { isArray } = Array

export default function toString() {
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
