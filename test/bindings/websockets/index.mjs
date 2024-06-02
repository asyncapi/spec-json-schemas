import {describe} from 'vitest';

describe('WebSockets Test Suite', () => {
  describe('0.1.0', async () => {
    await import('@test/bindings/websockets/0.1.0/channel/channel.test.mjs')
  });
})