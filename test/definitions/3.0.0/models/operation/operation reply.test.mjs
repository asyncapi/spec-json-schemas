import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const jsonSchema = require('@definitions/3.0.0/operationReply.json');

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
      "address": {
        "description": "Consumer inbox",
        "location": "$message.header#/replyTo"
      },
      "channel": {
        "$ref": "#/components/channels/channel"
      },
      "messages": [
        {
          "$ref": "#/components/messages/message 1"
        },
        {
          "$ref": "#/components/messages/message 2"
        },
        {
          "$ref": "#/components/messages/message 3"
        }
      ]
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

describe('Operation Reply', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
