import {describe, test} from 'vitest';

describe('Message test suite', () => {
  test('Correlation Id', require('./correlationId'));
  test('Message', require('./message'));
  test('Message Example', require('./messageExample'));
  test('Message Trait', require('./messageTrait'));
});
