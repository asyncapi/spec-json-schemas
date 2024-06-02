import {describe} from 'vitest';

describe('JMS Test Suite', () => {
  describe('0.0.1', async () => {
    await import('@test/bindings/jms/0.0.1/channel');
    await import('@test/bindings/jms/0.0.1/message');
    await import('@test/bindings/jms/0.0.1/server');
  });
})