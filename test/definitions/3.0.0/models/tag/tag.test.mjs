import {describe} from 'vitest';
import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';

const jsonSchema = require('@definitions/3.0.0/tag.json');

const config = new JsonSchemaTestSuiteConfig(
  true,
  ['must have required property \'name\''],
  true,
  []
);

const data = new JsonSchemaTestSuiteData(
  jsonSchema,
  [
    {
      "name": "user",
      "description": "User-related messages",
      "externalDocs": {
        "description" : "Find more info here",
        "url" : "https://example.com"
      }
    }
  ],
  {
    "name": "user"
  },
  {
    "description": "User-related messages",
    "externalDocs": {
      "description" : "Find more info here",
      "url" : "https://example.com"
    }
  },
  {
    "name": "user",
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    }
  },
  {
    "name": "user",
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    },
    "ext-number": 1
  }
);

describe('Tag', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});