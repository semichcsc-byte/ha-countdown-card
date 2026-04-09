import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/countdown-card.js',
      format: 'es',
    },
    plugins: [
      resolve(),
      terser(),
    ],
  },
  {
    input: 'src/countdown-timer-card.js',
    output: {
      file: 'dist/countdown-timer-card.js',
      format: 'es',
    },
    plugins: [
      resolve(),
      terser(),
    ],
  },
];
