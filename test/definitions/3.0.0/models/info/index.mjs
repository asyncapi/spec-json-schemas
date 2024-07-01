import {describe} from 'vitest';

describe('Info Test Suite', async () => {
  await import('./info');
  await import('./info extensions');
  await import('./contact');
  await import('./license');
});
