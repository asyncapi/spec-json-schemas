import {describe} from 'vitest';

describe('Pulsar Test Suite', () => {
  describe('0.1.0', async () => {
    await import('./0.1.0/channel/channel.test.js')
    await import('./0.1.0/server/server.test.js')
  });
})