import {describe, suite} from 'vitest';

describe('WebSockets', () => {
  suite('0.1.0', () => {
    test('Channel', require('./0.1.0/channel/channel.test.js'));
  });
})