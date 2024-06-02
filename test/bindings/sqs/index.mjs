import {describe} from 'vitest';

describe('Amazon SQS Test Suite', () => {
  describe('0.2.0', async () => {
    await import('./0.2.0/channel');
    await import('./0.2.0/operation');
  });
})