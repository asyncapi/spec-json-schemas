import {describe} from 'vitest';

describe('NATS Test Suite', () => {
  describe('0.1.0', async () => {
    await import('./0.1.0/operation');
  });
})