import {describe, suite} from 'vitest';

describe('Anypoint MQ', () => {
  suite('0.0.1', () => {
    test('Channel', require('./0.0.1/channel/channel.test.js'));
    test('Message', require('./0.0.1/message/message.test.js'));
  });
})