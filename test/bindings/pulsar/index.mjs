import {describe, suite} from 'vitest';

describe('Pulsar', () => {
  suite('0.1.0', () => {
    test('Channel', require('./0.1.0/channel/channel.test.js'));
    test('Server', require('./0.1.0/server/server.test.js'));
  });
})