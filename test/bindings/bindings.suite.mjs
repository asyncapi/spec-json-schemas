import {describe} from 'vitest';

describe('Bindings Test Suite', async () => {
  await import('@test/bindings/amqp/index.mjs');
  await import('@test/bindings/anypointmq/index.mjs');
  await import('@test/bindings/googlepubsub/index.mjs');
  await import('@test/bindings/http/index.mjs');
  await import('@test/bindings/ibmmq/index.mjs');
  await import('@test/bindings/jms/index.mjs');
  await import('@test/bindings/kafka/index.mjs');
  await import('@test/bindings/mqtt/index.mjs');
  await import('@test/bindings/nats/index.mjs');
  await import('@test/bindings/pulsar/index.mjs');
  await import('@test/bindings/sns/index.mjs');
  await import('@test/bindings/solace/index.mjs');
  await import('@test/bindings/sqs/index.mjs');
  await import('@test/bindings/websockets/index.mjs');
})