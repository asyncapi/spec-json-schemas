import {describe} from 'vitest';

describe('AMQP Test Suite', () => {
  describe('0.2.0', async () => {
    await import('./0.2.0/channel/channel.test.js');
    await import('./0.2.0/message/message.test.js');
    await import('./0.2.0/operation/operation.test.js');
    await import('./0.2.0/server/server.test.mjs');
  });

  describe('0.3.0', async () => {
    await import('./0.3.0/channel/channel.test.js');
    await import('./0.3.0/message/message.test.js');
    await import('./0.3.0/operation/operation.test.js');
    await import('./0.3.0/server/server.test.js');
  });
})