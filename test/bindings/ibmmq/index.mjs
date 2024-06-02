import {describe} from 'vitest';

describe('IBM MQ Test Suite', () => {
  describe('0.1.0', async () => {
    await import('./0.1.0/channel');
    await import('./0.1.0/message');
    await import('./0.1.0/server');
  });
})