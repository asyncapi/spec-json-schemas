import {describe, suite} from 'vitest';

describe('Amazon SNS', () => {
  suite('0.1.0', () => {
    test('Channel', require('./0.1.0/channel/channel.test.js'));
    test('Operation', require('./0.1.0/operation/operation.test.js'));
  });
})