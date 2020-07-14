export default function toJSON() {
	const buffer = { type: this.constructor.name }
	const { nodes, toJsonTypes } = this
	for (const name in toJsonTypes) {
		const value = nodes[name].map((node) => node.toJSON())

		if (value.length) {
			buffer[name] = value
		}
	}
	return buffer
}
