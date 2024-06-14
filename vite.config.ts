import { viteRequire } from 'vite-require';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteRequire()],
  test: {
    globals: true,
    include: [
        '**/test/schemas.mjs',
        '**/test/bundler.mjs',
        '**/test/index.test.mjs',
        '**/test/bindings/amqp/amqp.test.mjs',
        '**/test/bindings/anypointmq/anypointmq.test.mjs',
        '**/test/bindings/googlepubsub/googlepubsub.test.mjs',
        '**/test/bindings/ibmmq/ibmmq.test.mjs',
        '**/test/bindings/http/http.test.mjs',
        '**/test/bindings/jms/jms.test.mjs',
        '**/test/bindings/kafka/kafka.test.mjs',
        '**/test/bindings/mqtt/mqtt.test.mjs',
        '**/test/bindings/nats/nats.test.mjs',
        '**/test/bindings/pulsar/pulsar.test.mjs',
        '**/test/bindings/sns/sns.test.mjs',
        '**/test/bindings/solace/solace.test.mjs',
        '**/test/bindings/sqs/sqs.test.mjs',
        '**/test/bindings/websockets/websockets.test.mjs',
        '**/test/definitions/3.0.0/definitions.suite.mjs',
    ],
    reporters: ['verbose'] // https://vitest.dev/guide/reporters#custom-reporters
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
