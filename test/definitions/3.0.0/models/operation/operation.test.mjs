import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const jsonSchema = require('@definitions/3.0.0/operation.json');

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'action\'',
    'must have required property \'channel\''
  ],
  true,
  []
);

const data = new JsonSchemaTestSuiteData(
  jsonSchema,
  [
    {
      "title": "User sign up",
      "summary": "Action to sign a user up.",
      "description": "A longer description",
      "channel": {
        "$ref": "#/channels/userSignup"
      },
      "action": "send",
      "tags": [{ "name": "user" }, { "name": "signup" }, { "name": "register" }],
      "bindings": {
        "amqp": {
          "ack": false
        }
      },
      "traits": [{ "$ref": "#/components/operationTraits/kafka" }]
    }
  ],
  {
    "channel": {
      "$ref": "#/channels/userSignup"
    },
    "action": "send"
  },
  {
    "title": "User sign up",
    "summary": "Action to sign a user up.",
    "description": "A longer description",
    "bindings": {
      "amqp": {
        "ack": false
      }
    },
    "traits": [{ "$ref": "#/components/operationTraits/kafka" }]
  },
  {
    "channel": {
      "$ref": "#/channels/userSignup"
    },
    "action": "send",
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    }
  },
  {
    "channel": {
      "$ref": "#/channels/userSignup"
    },
    "action": "send",
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    },
    "ext-number": 1
  }
);

describe('Operation', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
