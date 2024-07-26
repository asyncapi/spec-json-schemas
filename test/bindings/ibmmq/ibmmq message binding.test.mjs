import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must match exactly one schema in oneOf'
  ],
  true,
  []
);

let data = {
  "0.1.0": new JsonSchemaTestSuiteData(
    require(`@bindings/ibmmq/0.1.0/message.json`),
    [
      {
        "type": "jms",
        "description": "JMS stream message",
        "expiry": 0
      }
    ],
    {
      "type": "jms",
      "description": "JMS stream message",
    },
    {},
    {
      "type": "jms",
      "description": "JMS stream message",
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "type": "jms",
      "description": "JMS stream message",
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
  '0.1.0',
])('IBM MQ message binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
