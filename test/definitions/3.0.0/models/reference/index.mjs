import {describe} from 'vitest';

describe('Reference Test Suite', async () => {
  await import('./reference');
  await import('./reference object');
});