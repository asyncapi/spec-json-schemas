import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const jsonSchema = require('@definitions/3.0.0/operationTrait.json');

const config = new JsonSchemaTestSuiteConfig(
  false,
  [],
  true,
  []
);

const data = new JsonSchemaTestSuiteData(
  jsonSchema,
  [
    {
      "title": "Send message operation",
      "summary": "Send message",
      "description": "Send message to remote server",
      "security": [
        {
          "type": "apiKey",
          "description": "apiKey",
          "in": "user"
        },
        {
          "$ref": "#/components/security/plain"
        }
      ],
      "tags": [
        {
          "$ref": "#/components/tags/tag"
        }
      ],
      "externalDocs": {
        "$ref": "#/components/externalDocs"
      },
      "bindings": {
        "amqp":{
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
      }
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
);

describe('Operation Trait', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
