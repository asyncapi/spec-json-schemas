import {describe, it} from 'vitest';

describe('Server test suite', () => {
  it('Server', () => require('./server'));
  it('Server Variable', () => require('./serverVariable'));
});
