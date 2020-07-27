import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

const config = {
	input: `src/index.js`,
	output: [
		{
			file: `dist/index.cjs`,
			format: `cjs`,
			strict: false,
		},
		{
			file: `dist/index.mjs`,
			format: `esm`,
			strict: false,
		},
		{
			file: `dist/index.iife.js`,
			format: `iife`,
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
				terser({
					mangle: {
						keep_fnames: /^CSS/
					}
				}),
			],
		},
	],
	plugins: [
		filesize(),
	],
}

export default config
