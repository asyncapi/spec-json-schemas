import {describe, suite} from 'vitest';

describe('Kafka', () => {
  suite('0.1.0', () => {
    test('Message', require('./0.1.0/message/message.test.js'));
    test('Operation', require('./0.1.0/operation/operation.test.js'));
  });

  suite('0.3.0', () => {
    test('Channel', require('./0.3.0/channel/channel.test.js'));
    test('Message', require('./0.3.0/message/message.test.js'));
    test('Operation', require('./0.3.0/operation/operation.test.js'));
    test('Server', require('./0.3.0/server/server.test.js'));
  });

  suite('0.4.0', () => {
    test('Channel', require('./0.4.0/channel/channel.test.js'));
    test('Message', require('./0.4.0/message/message.test.js'));
    test('Operation', require('./0.4.0/operation/operation.test.js'));
    test('Server', require('./0.4.0/server/server.test.js'));
  });

  suite('0.5.0', () => {
    test('Channel', require('./0.5.0/channel/channel.test.js'));
    test('Message', require('./0.5.0/message/message.test.js'));
    test('Operation', require('./0.5.0/operation/operation.test.js'));
    test('Server', require('./0.5.0/server/server.test.js'));
  });
})