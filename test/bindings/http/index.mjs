import {describe} from 'vitest';

describe('HTTP Test Suite', () => {
  describe('0.1.0', async () => {
    await import('./0.1.0/message')
    await import('./0.1.0/operation')
  });

  describe('0.2.0', async () => {
    await import('./0.2.0/message')
    await import('./0.2.0/operation')
  });

  describe('0.3.0', async () => {
    await import('./0.3.0/message')
    await import('./0.3.0/operation')
  });
})