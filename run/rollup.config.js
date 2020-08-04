import MagicString from 'magic-string'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

const terserOpts = {
	compress: {
		unsafe: true,
	},
	keep_fnames: /^(tokenize$|CSS)/,
	mangle: {},
	module: true,
	output: {
		beautify: false,
	},
	parse: {},
	rename: {},
	toplevel: true,
	warnings: false,
}

const config = [
	{
		input: `src/tokenizer/tokenize.iife.js`,
		output: {
			dir: 'dist',
			format: `iife`,
			strict: false
		},
		plugins: [
			custom(),
			terser(terserOpts),
			filesize(),
		],
	},
	{
		input: `src/tokenizer/tokenize.js`,
		output: {
			dir: 'dist',
			format: `esm`,
			strict: false
		},
		plugins: [
			filesize(),
		],
	}
]

export default config

function custom() {
	return {
		renderChunk(code, chunk, options) {
			const magic = new MagicString(code)

			magic.overwrite(code.length - 5, code.length, `})(Object.prototype.__defineGetter__('_t',function(){return this;;;})||_t,delete Object.prototype._t)`).overwrite(0, 15, '(function(globalThis){')

			const magicCode = `${magic.toString()}\n//# sourceMappingURL=${magic.generateMap({ hires: true }).toUrl()}`

			// const result = Terser.minify(magicCode, { ...terserOpts, sourceMap: true })

			return magicCode
		}
	}
}

