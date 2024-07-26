import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  false,
  [],
  true,
  []
);

let data = {
  "0.1.0": new JsonSchemaTestSuiteData(
    require(`@bindings/ibmmq/0.1.0/channel.json`),
    [
      {
        "destinationType": "queue",
        "queue": {
          "objectName": "message",
          "isPartitioned": false,
          "exclusive": true
        },
        "maxMsgLength": 1024
      },
      {
        "destinationType": "topic",
        "topic": {
          "string": "messages",
          "objectName": "message",
          "durablePermitted": true,
          "lastMsgRetained": true
        },
        "maxMsgLength": 1024
      }
    ],
    {},
    {},
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
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
])('IBM MQ channel binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
