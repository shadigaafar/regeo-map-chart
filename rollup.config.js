import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

export default [
	{
		input: './src/index.js',
		output: [
			{
				file: 'dist/index.esm.js',
				format: 'esm',
			},
		],
		plugins: [
			replace({
				'process.env.NODE_ENV': JSON.stringify('production'),
				preventAssignment: true,
			}),
			image(),
			json(),
			babel({
				exclude: ['node_module/**', 'world.en.json'],
				presets: ['@babel/preset-react'],
			}),
			external(),
			resolve(),
			commonjs(),
			postcss({
				plugins: [autoprefixer()],
				modules: true,
				minimize: true,
			}),
			terser(),
		],
	},
];
