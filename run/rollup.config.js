import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const rollup = Object(pkg.rollup)

const mapPlugins = async (plugins) => plugins
	? Promise.all(
		plugins.map(
			async (plugin, options) => (
				(
					plugin = [].concat(plugin),
					options = plugin.slice(1),
					plugin = plugin[0],
					plugin = await import(plugin),
					plugin = plugin.default || plugin,
					plugin = plugin.default || plugin,
					plugin(...options)
				)
			)
		)
	)
	: []

export default (async () => {
	return {
		...rollup,
		plugins: await mapPlugins(rollup.plugins),
		output: (
			Array.isArray(rollup.output)
				? await Promise.all(
					rollup.output.map(
						async (output) => ({
							...output,
							plugins: await mapPlugins(output.plugins)
						})
					)
				)
				: []
		),
		onwarn(warning, warn) {
			if (warning.code !== 'UNRESOLVED_IMPORT') warn(warning)
		}
	}
})()
