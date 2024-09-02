import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const jsonSchema = require('@definitions/3.0.0/Reference.json');

const config = new JsonSchemaTestSuiteConfig(
  true,
  ['must have required property \'$ref\''],
  false,
  []
);

const data = new JsonSchemaTestSuiteData(
  jsonSchema,
  [
    {
      "$ref": "#/components/schemas/user"
    }
  ],
  {
    "$ref": "#/components/schemas/user"
  },
  {},
  {
    "$ref": "#/components/schemas/user",
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    }
  },
  {
    "$ref": "#/components/schemas/user",
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    },
    "ext-number": 1
  }
);

describe('Reference', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
