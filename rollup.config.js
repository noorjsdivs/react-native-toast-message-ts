import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'lib/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react', '@babel/preset-typescript'],
      babelrc: false,
      configFile: false,
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './lib',
      jsx: 'react',
    }),
  ],
  external: ['react', 'react-native'],
};
