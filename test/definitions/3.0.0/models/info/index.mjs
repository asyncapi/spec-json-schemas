import {describe} from 'vitest';

describe('Info Test Suite', () => {
  test('Info',  require('./info'));
  test('Info Extensions', require('./info extensions'));
  test('Contact', require('./contact'));
  test('License', require('./license'));
});
