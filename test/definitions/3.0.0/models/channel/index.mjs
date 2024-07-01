import {describe} from 'vitest';

describe('Channel Test Suite', async () => {
  await import('./channel');
  await import('./message');
  await import('./parameter');
});
