import {describe} from 'vitest';

describe('Anypoint MQ Test Suite', () => {
  describe('0.0.1', async () => {
    await import('./0.0.1/channel/channel.test.js');
    await import('./0.0.1/message/message.test.js');
  });
})