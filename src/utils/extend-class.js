const { create } = Object

export default function extendClass(Class, Super) {
	Class.prototype = create(
		(Class.__proto__ = Super).prototype,
		{
			constructor: {
				value:        Class,
				configurable: true,
				writable:     true,
			},
		}
	)
}
