import {describe, suite} from 'vitest';

describe('AMQP', () => {
  suite('0.2.0', () => {
    test('Operation', require('./0.2.0/operation/operation.test.js'));
    test('Server', require('./0.2.0/server/server.test.js'));
  });

  suite('0.3.0', () => {
    test('Operation', require('./0.3.0/operation/operation.test.js'));
    test('Server', require('./0.3.0/server/server.test.js'));
  });

  suite('0.4.0', () => {
    test('Operation', require('./0.4.0/operation/operation.test.js'));
    test('Server', require('./0.4.0/server/server.test.js'));
  });
})