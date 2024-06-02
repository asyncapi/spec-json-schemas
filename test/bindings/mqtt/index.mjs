import {describe} from 'vitest';

describe('MQTT Test Suite', () => {
  describe('0.1.0', async () => {
    await import('./0.1.0/message');
    await import('./0.1.0/operation');
    await import('./0.1.0/server');
  });

  describe('0.2.0', async () => {
    await import('./0.2.0/message');
    await import('./0.2.0/operation');
    await import('./0.2.0/server');
  });
})