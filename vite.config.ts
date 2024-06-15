import { viteRequire } from 'vite-require';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteRequire()],
  test: {
    globals: true,
    include: [
        '**/test/*.test.mjs',
        '**/test/index.test.mjs',
        '**/test/bindings/**/*.test.mjs',
        '**/test/definitions/3.0.0/definitions.suite.mjs',
    ],
    reporters: ['verbose'] // https://vitest.dev/guide/reporters#custom-reporters
  },
  root: "./",
  resolve: {
      alias: {
        // @ts-ignore
        '@extensions': new URL('./extensions', import.meta.url).pathname,
        // @ts-ignore
        '@examples': new URL('./examples', import.meta.url).pathname,
        // @ts-ignore
        '@definitions': new URL('./definitions', import.meta.url).pathname,
        // @ts-ignore
        '@bindings': new URL('./bindings', import.meta.url).pathname,
        // @ts-ignore
        '@common': new URL('./common', import.meta.url).pathname,
        // @ts-ignore
        '@test': new URL('./test', import.meta.url).pathname
      },
    },
})
