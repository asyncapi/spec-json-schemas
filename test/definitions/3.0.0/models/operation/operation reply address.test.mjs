import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const jsonSchema = require('@definitions/3.0.0/operationReplyAddress.json');

const config = new JsonSchemaTestSuiteConfig(
  true,
  ['must have required property \'location\''],
  true,
  []
);

const data = new JsonSchemaTestSuiteData(
  jsonSchema,
  [
    {
      "description" : "Consumer inbox",
      "location" : "$message.header#/replyTo"
    }
  ],
  {
    "location" : "$message.header#/replyTo"
  },
  {
    "description" : "Consumer inbox"
  },
  {
    "location" : "$message.header#/replyTo",
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    }
  },
  {
    "location" : "$message.header#/replyTo",
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    },
    "ext-number": 1
  }
);

describe('Operation Reply Address', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
