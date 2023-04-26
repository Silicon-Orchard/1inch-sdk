// Rollup plugins
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
import filesize from 'rollup-plugin-filesize';
const { terser } = require('rollup-plugin-terser');

module.exports = {
	input: './src/index.js',
	output: [
		{
			file: 'lib/index.js',
			format: 'cjs',
		},
		{
			file: 'lib/index.esm.js',
			format: 'es',
		},
	],
	format: 'iife',
	sourceMap: 'inline',
	plugins: [
		terser(),
		resolve({ extensions: ['.js', '.ts'] }),
		babel({
			exclude: 'node_modules/**',
			babelrc: true,
			envName: 'esm',
			extensions: ['.js', '.ts'],
		}),
		filesize(),
	],
};
