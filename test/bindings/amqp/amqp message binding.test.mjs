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
  "0.2.0": new JsonSchemaTestSuiteData(
    require(`@bindings/amqp/0.2.0/message.json`),
    [
      {
        "contentEncoding": "gzip",
        "messageType": "user.signup",
        "bindingVersion": "0.2.0"
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
  "0.3.0": new JsonSchemaTestSuiteData(
    require(`@bindings/amqp/0.3.0/message.json`),
    [
      {
        "contentEncoding": "gzip",
        "messageType": "user.signup",
        "bindingVersion": "0.3.0"
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
  )
}

describe.each([
  '0.2.0',
  '0.3.0'
])('AMQP message binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
