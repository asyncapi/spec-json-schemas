import {describe} from 'vitest';

describe('Message Test Suite', async () => {
  await import('./correlationId');
  await import('./message');
  await import('./messageExample');
  await import('./messageTrait');
});
