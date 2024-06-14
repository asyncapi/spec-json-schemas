import {describe} from 'vitest';

describe('Bindings Test Suite', async () => {
  await import('@test/bindings/solace/index.mjs');
  await import('@test/bindings/sqs/index.mjs');
  await import('@test/bindings/websockets/index.mjs');
})