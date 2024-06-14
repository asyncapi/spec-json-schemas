import {describe} from 'vitest';

describe('Bindings Test Suite', async () => {
  await import('@test/bindings/mqtt/index.mjs');
  await import('@test/bindings/nats/index.mjs');
  await import('@test/bindings/pulsar/index.mjs');
  await import('@test/bindings/sns/index.mjs');
  await import('@test/bindings/solace/index.mjs');
  await import('@test/bindings/sqs/index.mjs');
  await import('@test/bindings/websockets/index.mjs');
})