import {describe, suite} from 'vitest';

describe('NATS', () => {
  suite('0.1.0', () => {
    test('Operation', require('./0.1.0/operation/operation.test.js'));
  });
})