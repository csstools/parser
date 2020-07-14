export const { defineProperty } = Object

export default function defineEnumerableAccessor(object, name, setInitialValue, setValue) {
	defineProperty(object, name, {
		get: Function.call.bind(init, Function, `get`),
		set: Function.call.bind(init, Function, `set`),
	})
	function init(type, self) {
		const descriptor = {
			get: function () {
				return value
			},
			set: function (nextValue) {
				return setValue(value, nextValue)
			},
			configurable: true,
		}
		let value = setInitialValue(self, type)
		defineProperty(self, name, descriptor)
		descriptors[type].call(self)
	}
}
