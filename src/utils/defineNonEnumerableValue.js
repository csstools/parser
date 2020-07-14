export const { defineProperty } = Object

export default function defineNonEnumerableValue(object, name, value) {
	return defineProperty(object, name, {
		value,
		configurable: true,
		writable:     true,
	})
}
