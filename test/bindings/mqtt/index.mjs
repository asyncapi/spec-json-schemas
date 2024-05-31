import {describe, suite} from 'vitest';

describe('MQTT', () => {
  suite('0.1.0', () => {
    test('Message', require('./0.1.0/message/message.test.js'));
    test('Operation', require('./0.1.0/operation/operation.test.js'));
    test('Server', require('./0.1.0/server/server.test.js'));
  });

  suite('0.2.0', () => {
    test('Message', require('./0.2.0/message/message.test.js'));
    test('Operation', require('./0.2.0/operation/operation.test.js'));
    test('Server', require('./0.2.0/server/server.test.js'));
  });
})