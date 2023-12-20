import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import sass from 'rollup-plugin-sass';

import packageJson from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
      postcss({
        extract: false,
        modules: true,
        use: ['sass'],
      }),
      sass({
        include: 'src/scss/index.scss',
        output: 'dist/cjs/style.min.css',
        options: {
          outputStyle: 'compressed',
        },
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    input: 'dist/cjs/types/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.scss$/],
  },
];