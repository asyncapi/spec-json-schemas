import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const jsonSchema = require('@definitions/3.0.0/oauth2Flow.json');

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
      "tokenUrl": "https://example.com/api/oauth/token",
      "refreshUrl": "https://example.com/api/oauth/refresh",
      "availableScopes": {
        "write:pets": "modify pets in your account",
        "read:pets": "read your pets"
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

describe('OAuth2 Password Flow', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
