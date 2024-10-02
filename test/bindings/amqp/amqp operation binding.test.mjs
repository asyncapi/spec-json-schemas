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
    require(`@bindings/amqp/0.2.0/operation.json`),
    [
      {
        "expiration": 100000,
        "userId": "guest",
        "cc": [
          "user.logs"
        ],
        "priority": 10,
        "deliveryMode": 2,
        "mandatory": false,
        "bcc": [
          "external.audit"
        ],
        "timestamp": true,
        "ack": false,
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
    require(`@bindings/amqp/0.3.0/operation.json`),
    [
      {
        "expiration": 100000,
        "userId": "guest",
        "cc": [
          "user.logs"
        ],
        "priority": 10,
        "deliveryMode": 2,
        "mandatory": false,
        "bcc": [
          "external.audit"
        ],
        "timestamp": true,
        "ack": false,
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
  ),
  "0.4.0": new JsonSchemaTestSuiteData(
    require(`@bindings/amqp/0.4.0/operation.json`),
    [
      {
        "expiration": 100000,
        "userId": "guest",
        "cc": [
          "user.logs"
        ],
        "priority": 10,
        "deliveryMode": 2,
        "mandatory": false,
        "bcc": [
          "external.audit"
        ],
        "timestamp": true,
        "ack": false,
        "bindingVersion": "0.4.0"
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
  '0.3.0',
  '0.4.0'
])('AMQP operation binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
