import {describe, it} from 'vitest';

const assert = require('assert');
const Ajv = require('ajv');

function document(version, channelBinding, operationBinding) {
  return {
    asyncapi: version,
    info: {title: 'Events', version: '1.0.0'},
    channels: {
      events: {
        address: 'app:events',
        bindings: {redis: channelBinding},
      },
    },
    operations: {
      consumeEvent: {
        action: 'receive',
        channel: {$ref: '#/channels/events'},
        bindings: {redis: operationBinding},
      },
    },
  };
}

function validator(version) {
  const asyncapi = require('../../../index.js');
  const schema = asyncapi.schemas[version];
  delete schema.definitions['http://json-schema.org/draft-07/schema'];
  const ajv = new Ajv({
    jsonPointers: true,
    allErrors: true,
    schemaId: '$id',
    logger: false,
    validateFormats: false,
    strict: false,
  });
  return ajv.compile(schema);
}

describe.each([
  '3.0.0',
  '3.1.0',
])('AsyncAPI %s document with redis bindings', (version) => {
  const validate = validator(version);

  const valid = [
    ['stream with maxLen and consumerGroup (latest)', {type: 'stream', maxLen: 1}, {consumerGroup: 'my-service'}],
    ['pubsub without consumerGroup (latest)', {type: 'pubsub'}, {}],
    ['explicit bindingVersion 0.2.0', {type: 'stream', bindingVersion: '0.2.0'}, {consumerGroup: 'g', bindingVersion: '0.2.0'}],
    ['legacy bindingVersion 0.1.0 is not constrained', {bindingVersion: '0.1.0'}, {bindingVersion: '0.1.0'}],
    ['legacy bindingVersion 0.1.0 with arbitrary content', {bindingVersion: '0.1.0', foo: 1}, {bindingVersion: '0.1.0', foo: 1}],
  ];
  for (const [name, channelBinding, operationBinding] of valid) {
    it(`is valid: ${name}`, () => {
      const ok = validate(document(version, channelBinding, operationBinding));
      assert(ok === true, JSON.stringify(validate.errors, null, 2));
    });
  }

  const invalid = [
    ['maxLen on pubsub channel', {type: 'pubsub', maxLen: 1}, {}],
    ['channel without type', {maxLen: 1}, {}],
    ['empty channel binding without bindingVersion', {}, {}],
    ['unknown channel field', {type: 'stream', foo: 1}, {}],
    ['non-string consumerGroup', {type: 'stream'}, {consumerGroup: 1}],
    ['unknown bindingVersion', {type: 'stream', bindingVersion: '9.9.9'}, {}],
  ];
  for (const [name, channelBinding, operationBinding] of invalid) {
    it(`is not valid: ${name}`, () => {
      assert(validate(document(version, channelBinding, operationBinding)) === false);
    });
  }
})
