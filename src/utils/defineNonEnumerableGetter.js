export const { defineProperty } = Object

export default function defineNonEnumerableGetter(object, name, defaultValue) {
	return set.call(object, defaultValue)
	function set(nextValue) {
		return defineProperty(this, name, {
			get: function () {
				return nextValue
			},
			set,
			configurable: true,
		})
	}
}
