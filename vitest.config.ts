import { viteRequire } from 'vite-require';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteRequire()],
  test: {
    globals: true
  },
  resolve: {
      alias: {
        '@extensions': new URL('./extensions', import.meta.url).pathname,
        '@examples': new URL('./examples', import.meta.url).pathname,
        '@definitions': new URL('./definitions', import.meta.url).pathname,
        '@bindings': new URL('./bindings', import.meta.url).pathname,
        '@common': new URL('./common', import.meta.url).pathname,
        '@test': new URL('./test', import.meta.url).pathname
      },
    },
})
