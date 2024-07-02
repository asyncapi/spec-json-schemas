import {describe} from 'vitest';

describe('Models Test Suite', async () => {
  await import('./channel');
  await import('./operation');
});
