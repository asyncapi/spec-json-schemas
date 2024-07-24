import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const jsonSchema = require('@definitions/3.0.0/channel.json');

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
      "address": "users.{userId}",
      "title": "Users channel",
      "description": "This channel is used to exchange messages about user events.",
      "messages": {
        "userSignedUp": {
          "$ref": "#/components/messages/userSignedUp"
        },
        "userCompletedOrder": {
          "$ref": "#/components/messages/userCompletedOrder"
        }
      },
      "parameters": {
        "userId": {
          "$ref": "#/components/parameters/userId"
        }
      },
      "servers": [
        { "$ref": "#/servers/rabbitmqInProd" },
        { "$ref": "#/servers/rabbitmqInStaging" }
      ],
      "bindings": {
        "amqp": {
          "is": "queue",
          "queue": {
            "exclusive": true
          }
        }
      },
      "tags": [
        {
          "name": "user",
          "description": "User-related messages"
        }
      ],
      "externalDocs": {
        "description": "Find more info here",
        "url": "https://example.com"
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

describe('Channel', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
