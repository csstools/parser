export default class CSSObject {
	constructor(init) {
		for (const name in init) {
			this[name] = init[name]
		}
	}
}
