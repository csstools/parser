export function toNonEnumerableDescriptor(value) {
	return {
		value,
		configurable: true,
		writable:     true,
	}
}

export function toEnumerableDescriptor(value) {
	return {
		value,
		configurable: true,
		enumerable:   true,
		writable:     true,
	}
}
