import {describe, test} from 'vitest';

describe('Channel test suite', () => {
  test('Channel', require('./channel'));
  test('Message', require('./message'));
  test('Parameter', require('./parameter'));
});
