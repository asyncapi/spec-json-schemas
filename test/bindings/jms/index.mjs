import {describe} from 'vitest';

describe('JMS Test Suite', () => {
  describe('0.1.0', async () => {
    await import('./0.1.0/channel/channel.test.js');
    await import('./0.1.0/message/message.test.js');
    await import('./0.1.0/server/server.test.js');
  });
})