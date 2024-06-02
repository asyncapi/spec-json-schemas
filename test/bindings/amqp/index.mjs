import {describe} from 'vitest';

describe('AMQP Test Suite', () => {
  describe('0.2.0', async () => {
    await import('./0.2.0/channel');
    await import('./0.2.0/message');
    await import('./0.2.0/operation');
  });

  describe('0.3.0', async () => {
    await import('./0.3.0/channel');
    await import('./0.3.0/message');
    await import('./0.3.0/operation');
  });
})