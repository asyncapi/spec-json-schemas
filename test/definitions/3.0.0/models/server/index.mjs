import {describe} from 'vitest';

describe('Server Test Suite', async () => {
  await import('./server');
  await import('./serverVariable');
});
