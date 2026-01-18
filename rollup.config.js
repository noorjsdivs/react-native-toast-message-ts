import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.js',
      format: 'cjs',
      sourcemap: false,
      exports: 'named',
    },
    {
      file: 'lib/index.esm.js',
      format: 'esm',
      sourcemap: false,
      exports: 'named',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'lib',
      exclude: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx'],
    }),
  ],
  external: ['react', 'react-native'],
};
