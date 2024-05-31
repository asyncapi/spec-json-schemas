import {describe, suite} from 'vitest';

describe('Google Pub/Sub', () => {
  suite('0.1.0', () => {
    test('Channel', require('./0.1.0/channel/channel.test.js'));
    test('Message', require('./0.1.0/message/message.test.js'));
  });

  suite('0.2.0', () => {
    test('Channel', require('./0.2.0/channel/channel.test.js'));
    test('Message', require('./0.2.0/message/message.test.js'));
  });
})