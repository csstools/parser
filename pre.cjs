const module = require(`module`)
const fs = require(`fs`)

module.Module._extensions[`.js`] = function (module, filename) {
	const contents = fs.readFileSync(filename, `utf8`)
	module._compile(fs.readFileSync(filename, `utf8`), filename)
}
