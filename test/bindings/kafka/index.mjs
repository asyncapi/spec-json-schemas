import {describe} from 'vitest';

describe('Kafka Test Suite', () => {
  describe('0.1.0', async () => {
    await import('./0.1.0/message/message.test.js');
    await import('./0.1.0/operation/operation.test.js');
  });

  describe('0.3.0', async () => {
    await import('./0.3.0/channel/channel.test.js');
    await import('./0.3.0/message/message.test.js');
    await import('./0.3.0/operation/operation.test.js');
    await import('./0.3.0/server/server.test.js');
  });

  describe('0.4.0', async () => {
    await import('./0.4.0/channel/channel.test.js');
    await import('./0.4.0/message/message.test.js');
    await import('./0.4.0/operation/operation.test.js');
    await import('./0.4.0/server/server.test.js');
  });

  describe('0.5.0', async () => {
    await import('./0.5.0/channel/channel.test.js');
    await import('./0.5.0/message/message.test.js');
    await import('./0.5.0/operation/operation.test.js');
    await import('./0.5.0/server/server.test.js');
  });
})