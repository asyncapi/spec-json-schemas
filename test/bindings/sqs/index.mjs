import {describe} from 'vitest';

describe('Amazon SQS Test Suite', () => {
  describe('0.2.0', async () => {
    await import('./0.2.0/channel/channel.test.js');
    await import('./0.2.0/operation/operation.test.js');
  });
})