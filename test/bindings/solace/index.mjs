import {describe} from 'vitest';

describe('Solace Test Suite', () => {
  describe('0.2.0', async () => {
    await import('./0.2.0/operation/operation.test.js')
    await import('./0.2.0/server/server.test.js')
  });

  describe('0.3.0', async () => {
    await import('./0.3.0/operation/operation.test.js')
    await import('./0.3.0/server/server.test.js')
  });

  describe('0.4.0', async () => {
    await import('./0.4.0/operation/operation.test.js')
    await import('./0.4.0/server/server.test.js')
  });
})