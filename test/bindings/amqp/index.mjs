import {describe, suite} from 'vitest';

describe('AMQP', () => {
  suite('0.2.0', () => {
    test('Channel', require('./0.2.0/channel/channel.test.js'));
    test('Message', require('./0.2.0/message/message.test.js'));
    test('Operation', require('./0.2.0/operation/operation.test.js'));
    test('Server', require('./0.2.0/server/server.test.js'));
  });

  suite('0.3.0', () => {
    test('Channel', require('./0.3.0/channel/channel.test.js'));
    test('Message', require('./0.3.0/message/message.test.js'));
    test('Operation', require('./0.3.0/operation/operation.test.js'));
    test('Server', require('./0.3.0/server/server.test.js'));
  });
})