import {describe} from 'vitest';

describe('Google Pub/Sub Test Suite', () => {
  describe('0.1.0', async () => {
    await import('./0.1.0/channel/channel.test.js')
    await import('./0.1.0/message/message.test.js')
  });

  describe('0.2.0', async () => {
    await import('./0.2.0/channel/channel.test.js')
    await import('./0.2.0/message/message.test.js')
  });
})