import {describe, suite} from 'vitest';

describe('JMS', () => {
  suite('0.1.0', () => {
    test('Channel', require('./0.1.0/channel/channel.test.js'));
    test('Message', require('./0.1.0/message/message.test.js'));
    test('Server', require('./0.1.0/server/server.test.js'));
  });
})