import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'exchange\'',
    'must have required property \'queue\'',
    'must match exactly one schema in oneOf'
  ],
  true,
  []
);

let data = {
  "0.2.0": new JsonSchemaTestSuiteData(
    require(`@bindings/amqp/0.2.0/channel.json`),
    [
      {
        "is": "queue",
        "queue": {
          "name": "my-queue-name",
          "durable": true,
          "exclusive": true,
          "autoDelete": false,
          "vhost": "/"
        },
        "bindingVersion": "0.2.0"
      },
      {
        "is": "routingKey",
        "exchange": {
          "name": "myExchange",
          "type": "topic",
          "durable": true,
          "autoDelete": false,
          "vhost": "/"
        },
        "bindingVersion": "0.2.0"
      }
    ],
    {
      "is": "queue",
      "queue": {
        "name": "my-queue-name",
        "durable": true,
        "exclusive": true,
        "autoDelete": false,
        "vhost": "/"
      },
      "bindingVersion": "0.2.0"
    },
    {
      "bindingVersion": "0.2.0"
    },
    {
      "is": "queue",
      "queue": {
        "name": "my-queue-name",
        "durable": true,
        "exclusive": true,
        "autoDelete": false,
        "vhost": "/"
      },
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "is": "queue",
      "queue": {
        "name": "my-queue-name",
        "durable": true,
        "exclusive": true,
        "autoDelete": false,
        "vhost": "/"
      },
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ),
  "0.3.0": new JsonSchemaTestSuiteData(
    require(`@bindings/amqp/0.3.0/channel.json`),
    [
      {
        "is": "queue",
        "queue": {
          "name": "my-queue-name",
          "durable": true,
          "exclusive": true,
          "autoDelete": false,
          "vhost": "/"
        },
        "bindingVersion": "0.3.0"
      },
      {
        "is": "routingKey",
        "exchange": {
          "name": "myExchange",
          "type": "topic",
          "durable": true,
          "autoDelete": false,
          "vhost": "/"
        },
        "bindingVersion": "0.3.0"
      }
    ],
    {
      "is": "queue",
      "queue": {
        "name": "my-queue-name",
        "durable": true,
        "exclusive": true,
        "autoDelete": false,
        "vhost": "/"
      },
      "bindingVersion": "0.3.0"
    },
    {
      "bindingVersion": "0.3.0"
    },
    {
      "is": "queue",
      "queue": {
        "name": "my-queue-name",
        "durable": true,
        "exclusive": true,
        "autoDelete": false,
        "vhost": "/"
      },
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "is": "queue",
      "queue": {
        "name": "my-queue-name",
        "durable": true,
        "exclusive": true,
        "autoDelete": false,
        "vhost": "/"
      },
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
])('AMQP channel binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
