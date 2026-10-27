import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import TestHelper from '@test/test-helper';
import {describe, it} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'type\'',
  ],
  true,
  []
);

let data = {
  "0.2.0": new JsonSchemaTestSuiteData(
    require(`@bindings/redis/0.2.0/channel.json`),
    [
      {
        "type": "stream",
        "maxLen": 1,
        "bindingVersion": "0.2.0"
      },
      {
        "type": "pubsub",
        "bindingVersion": "0.2.0"
      }
    ],
    {
      "type": "pubsub"
    },
    {
      "maxLen": 1
    },
    {
      "type": "stream",
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "type": "stream",
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ),
}

describe.each([
  '0.2.0',
])('Redis channel binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()

  const schema = data[bindingVersion].jsonSchema;

  it('is not valid with unknown type', () => TestHelper.objectIsNotValid(
    schema,
    {"type": "list"},
    ['must be equal to one of the allowed values'],
  ));

  it('is not valid with maxLen lower than 1', () => TestHelper.objectIsNotValid(
    schema,
    {"type": "stream", "maxLen": 0},
    ['must be >= 1'],
  ));

  it('is not valid with non-integer maxLen', () => TestHelper.objectIsNotValid(
    schema,
    {"type": "stream", "maxLen": 1.5},
    ['must be integer'],
  ));

  it('is not valid with maxLen on a pubsub channel', () => TestHelper.objectIsNotValid(
    schema,
    {"type": "pubsub", "maxLen": 1},
    ['must NOT be valid', 'must match "then" schema'],
  ));
})
