import { viteRequire } from 'vite-require';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteRequire()],
  test: {
    globals: true,
    include: [
        '**/test/index.test.mjs',
        '**/test/schemas.mjs'
    ]
  },
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
