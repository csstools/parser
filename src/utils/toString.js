const { isArray } = Array

export default function toString(value) {
	return value == null ? `` : isArray(value) ? value.join(``) : String(value)
}
