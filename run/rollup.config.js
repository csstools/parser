import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

const config = {
	input: `src/parse.js`,
	output: [
		{
			file: `dist/parse.cjs`,
			format: `cjs`,
			strict: false,
		},
		{
			file: `dist/parse.mjs`,
			format: `esm`,
			strict: false,
		},
		{
			file: `dist/parse.iife.js`,
			format: `esm`,
			strict: false,
			name: `CSSOM`,
			plugins: [
				getBabelOutputPlugin({
					allowAllFormats: true,
					presets: [
						[
							`@babel/preset-env`,
							{
								loose: true,
								modules: false,
								targets: {
									browsers: `ie >= 11`,
								},
								useBuiltIns: false,
							},
						],
					],
				}),
				terser(),
			],
		},
	],
	plugins: [
		filesize(),
	],
}

export default config
