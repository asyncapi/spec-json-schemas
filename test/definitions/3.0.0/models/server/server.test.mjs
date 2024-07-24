import {describe} from 'vitest';
import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';

const jsonSchema = require('@definitions/3.0.0/server.json');

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'host\'',
    'must have required property \'protocol\''
  ],
  true,
  []
);

const data = new JsonSchemaTestSuiteData(
  jsonSchema,
  [
    {
      "host": "rabbitmq.in.mycompany.com:5672",
      "pathname": "/production",
      "protocol": "amqp",
      "description": "Production RabbitMQ broker (uses the `production` vhost)."
    }
  ],
  {
    "host": "rabbitmq.in.mycompany.com:5672",
    "protocol": "amqp",
  },
  {
    "pathname": "/production",
    "description": "Production RabbitMQ broker (uses the `production` vhost)."
  },
  {
    "host": "rabbitmq.in.mycompany.com:5672",
    "protocol": "amqp",
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    }
  },
  {
    "host": "rabbitmq.in.mycompany.com:5672",
    "protocol": "amqp",
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    },
    "ext-number": 1
  }
);

describe('Server', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});