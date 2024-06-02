import {describe} from 'vitest';

describe('HTTP Test Suite', () => {
  describe('0.1.0', async () => {
    await import('./0.1.0/message/message.test.js')
    await import('./0.1.0/operation/operation.test.js')
  });

  describe('0.2.0', async () => {
    await import('./0.2.0/message/message.test.js')
    await import('./0.2.0/operation/operation.test.js')
  });

  describe('0.3.0', async () => {
    await import('./0.3.0/message/message.test.js')
    await import('./0.3.0/operation/operation.test.js')
  });
})