import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const jsonSchema = require('@definitions/3.0.0/correlationId.json');

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
      "description": "Default Correlation ID",
      "location": "$message.header#/correlationId"
    }
  ],
  {
    "location": "$message.header#/correlationId"
  },
  {
    "description": "Default Correlation ID",
  },
  {
    "location": "$message.header#/correlationId",
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    }
  },
  {
    "location": "$message.header#/correlationId",
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    },
    "ext-number": 1
  }
);

describe('Channel Correlation ID', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
